

/*
 * download_uri_internal
 *
 *  url_o           an nsIURI object of the page to be saved. required.
 *
 *  document_o      a document object of the page to be saved.
 *                  null if you want to save an URL that is not being
 *                  browsed, but in that case, you cannot save as text
 *                  or as `web-complete'.
 *
 *  dest_file_o     an nsILocalFile object for the destination file.
 *                  required.
 *
 *  dest_data_dir_o  an nsILocalFile object for the directory to hold
 *                   linked files when doing save-as-complete.  Otherwise
 *                   null.
 *
 *  referrer_o      nsIURI to pass as the referrer.  May be null.
 *
 *  content_type_s  a string content type of the document.  Required to
 *                  save as text or save as complete.  Should be provided
 *                  for save-page, but probably safe to pass null.  for URI's
 *                  not browsed yet (save-link) pass null.
 *
 *  should_bypass_cache_p   boolean tells whether to bypass cache data or not.
 *                          Usually pass true.
 *
 *  save_as_text_p  boolean tells whether to save as text.  mutually exclusive
 *                  with save_as_complete_p.  Only available when document_o is
 *                  supplied.
 *
 *  save_as_complete_p  boolean tells whether to save in complete mode.
 *                      mutually exclusive with save_as_text_p.  Only available
 *                      when document_o is supplied.  Requires dest_data_dir_o be
 *                      supplied.
 *
 */
function download_uri_internal (url_o, document_o,
                                dest_file_o, dest_data_dir_o, referrer_o,
                                post_data_o, content_type_s, should_bypass_cache_p,
                                save_as_text_p, save_as_complete_p)
{
    // We have no DOM, and can only save the URL as is.
    const SAVEMODE_FILEONLY      = 0x00;
    // We have a DOM and can save as complete.
    const SAVEMODE_COMPLETE_DOM  = 0x01;
    // We have a DOM which we can serialize as text.
    const SAVEMODE_COMPLETE_TEXT = 0x02;

    function GetSaveModeForContentType(aContentType)
    {
        var saveMode = SAVEMODE_FILEONLY;
        switch (aContentType) {
            case "text/html":
            case "application/xhtml+xml":
                saveMode |= SAVEMODE_COMPLETE_TEXT;
                // Fall through
            case "text/xml":
            case "application/xml":
                saveMode |= SAVEMODE_COMPLETE_DOM;
                break;
        }
        return saveMode;
    }

    // to save the current page, pass in the url object of the current url, and the document object.

    // saveMode defaults to SAVEMODE_FILEONLY, meaning we have no DOM, so we can only save the file as-is.
    // SAVEMODE_COMPLETE_DOM means we can save as complete.
    // SAVEMODE_COMPLETE_TEXT means we have a DOM and we can serialize it as text.
    // text/html will have all these flags set, meaning it can be saved in all these ways.
    // text/xml will have just FILEONLY and COMPLETE_DOM.  We cannot serialize plain XML as text.

    var saveMode = GetSaveModeForContentType (content_type_s);

    // is_document_p is a flag that tells us a document object was passed
    // in, its content type was passed in, and this content type has a DOM.

    var is_document_p = document_o != null && saveMode != SAVEMODE_FILEONLY;

    // use_save_document_p is a flag that tells us that it is possible to save as
    // either COMPLETE or TEXT, and that saving as such was requested by the
    // caller.
    //
    // Therefore, it is ONLY possible to save in COMPLETE or TEXT
    // mode if we pass in a document object and its content type, and its
    // content type supports those save modes.
    //
    // Ergo, we can implement the Conkeror commands, save-page-as-text and
    // save-page-complete, but not corresponding commands for links.

    var use_save_document_p = is_document_p &&
        (((saveMode & SAVEMODE_COMPLETE_DOM) && !save_as_text_p && save_as_complete_p) ||
         ((saveMode & SAVEMODE_COMPLETE_TEXT) && save_as_text_p));

    if (save_as_text_p && !use_save_document_p)
        throw ("Cannot save this page as text.");

    if (save_as_complete_p && !use_save_document_p)
        throw ("Cannot save this page in complete mode.");

    // source may be a document object or an url object.

    var source = use_save_document_p ? document_o : url_o;

    // fileURL is an url object representing the output file.

    var fileURL = conkeror.makeFileURL (dest_file_o);



    var persistArgs = {
        source: source,
        contentType: ((use_save_document_p && save_as_text_p) ?
                      "text/plain" : content_type_s),
        target: fileURL,
        postData: post_data_o,
        bypassCache: should_bypass_cache_p
    };

    const nsIWBP = Components.interfaces.nsIWebBrowserPersist;
    var persist = Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"]
        .createInstance(nsIWBP);

    // Calculate persist flags.
    const flags = nsIWBP.PERSIST_FLAGS_REPLACE_EXISTING_FLAGS;
    if (should_bypass_cache_p)
        persist.persistFlags = flags | nsIWBP.PERSIST_FLAGS_BYPASS_CACHE;
    else
        persist.persistFlags = flags | nsIWBP.PERSIST_FLAGS_FROM_CACHE;

    // Let the WebBrowserPersist decide whether the incoming data is encoded
    // and whether it needs to go through a content converter e.g. to
    // decompress it.
    persist.persistFlags |= nsIWBP.PERSIST_FLAGS_AUTODETECT_APPLY_CONVERSION;

    // Create download and initiate it (below)
    //
    //XXX RetroJ:
    //  This transfer object is what produces the gui downloads display.  As a
    //  future project, we will use a nsIWebProgressListener internal to
    //  conkeror that does not involve annoying gui dialogs.
    //
    var tr = Components.classes["@mozilla.org/transfer;1"].createInstance(Components.interfaces.nsITransfer);

    if (use_save_document_p)
    {
        // Saving a Document, not a URI:
        var encodingFlags = 0;
        if (persistArgs.contentType == "text/plain")
        {
            encodingFlags |= nsIWBP.ENCODE_FLAGS_FORMATTED;
            encodingFlags |= nsIWBP.ENCODE_FLAGS_ABSOLUTE_LINKS;
            encodingFlags |= nsIWBP.ENCODE_FLAGS_NOFRAMES_CONTENT;
        } else {
            encodingFlags |= nsIWBP.ENCODE_FLAGS_BASIC_ENTITIES;
        }

        const kWrapColumn = 80;

        // this transfer object is the only place in this document-saving branch where url_o is needed.
        tr.init (url_o, persistArgs.target, "", null, null, null, persist);
        persist.progressListener = tr;
        //persist.progressListener = progress_listener;
        persist.saveDocument (persistArgs.source, persistArgs.target, dest_data_dir_o,
                              persistArgs.contentType, encodingFlags, kWrapColumn);
    } else {
        // Saving a URI:

        tr.init (source, persistArgs.target, "", null, null, null, persist);
        persist.progressListener = tr;
        //persist.progressListener = progress_listener;
        persist.saveURI (source, null, referrer_o, persistArgs.postData, null,
                         persistArgs.target);
    }
}








/* maybe_get_filename_extension
 *
 * file_name_s: string filename, may be null.
 *
 * returns null or extension part of file_name_s.
 */
function maybe_get_filename_extension (file_name_s) {
    var url = Components.classes["@mozilla.org/network/standard-url;1"]
        .createInstance(Components.interfaces.nsIURL);
    url.filePath = file_name_s;
    if (url.fileExtension == '')
        return null;
    return url.fileExtension;
}


function maybe_get_url_extension (url_o) {
    try {
        url = url_o.QueryInterface(Components.interfaces.nsIURL);
        if (url.fileExtension == '')
            return null;
        return url.fileExtension;
    } catch (e) {
        return null;
    }
}

/* maybe_get_preferred_filename_extension
 *
 * file_name_s: string filename, may be null.
 *
 * content_type: string content type, may be null.
 *
 * returns null, the default extension for the given
 * content type, or the extension part of file_name_s.
 */
function maybe_get_preferred_filename_extension (file_name_s, content_type)
{
    var ext = maybe_get_filename_extension (file_name_s);
    var mimeInfo = null;
    var primary = null;
    if (content_type) {
        try {
            // throws if content_type is an empty string
            mimeInfo = Components.classes["@mozilla.org/mime;1"]
                .getService(Components.interfaces.nsIMIMEService)
                .getFromTypeAndExtension(content_type, ext);
            primary = mimeInfo.primaryExtension;
        } catch (e) { }
    }
    if (ext && mimeInfo && mimeInfo.extensionExists (ext))
        return ext;
    else if (primary)
        return primary;
    else
        return ext;
}


function maybe_get_preferred_url_extension (url_o, content_type) {
    var ext = maybe_get_url_extension (url_o);
    var mimeInfo = null;
    var primary = null;
    if (content_type) {
        try {
            mimeInfo = Components.classes["@mozilla.org/mime;1"]
                .getService(Components.interfaces.nsIMIMEService)
                .getFromTypeAndExtension(content_type, null);
            primary = mimeInfo.primaryExtension;
        } catch (e) { }
    }
    if (ext && mimeInfo && mimeInfo.extensionExists (ext))
        return ext;
    else if (primary)
        return primary;
    else
        return ext;
}

function getDefaultExtension (file_name_s, url_o, content_type) {
    if (content_type == "text/plain" ||
        content_type == "application/octet-stream" ||
        url_o.scheme == "ftp")
    {
        return "";
    }
    return (maybe_get_preferred_filename_extension (file_name_s, content_type) ||
            maybe_get_preferred_url_extension (url_o, content_type));
}

function getCharsetforSave(aDocument)
{
    if (aDocument)
        return aDocument.characterSet;
    return null;
}

function validateFileName(aFileName)
{
    var re = /[\/]+/g;
    if (get_os() == 'WINNT') {
        re = /[\\\/\|]+/g;
        aFileName = aFileName.replace(/[\"]+/g, "'");
        aFileName = aFileName.replace(/[\*\:\?]+/g, " ");
        aFileName = aFileName.replace(/[\<]+/g, "(");
        aFileName = aFileName.replace(/[\>]+/g, ")");
    }
    else if (get_os() == 'Darwin')
        re = /[\:\/]+/g;

    return aFileName.replace(re, "_");
}

function maybe_filename_from_content_disposition (aContentDisposition, charset) {
    if (aContentDisposition) {
        const mhp = Components.classes["@mozilla.org/network/mime-hdrparam;1"]
            .getService(Components.interfaces.nsIMIMEHeaderParam);
        var dummy = { value: null };  // Need an out param...

        var fileName = null;
        try {
            fileName = mhp.getParameter(aContentDisposition, "filename", charset, true, dummy);
        } catch (e) {
            try {
                fileName = mhp.getParameter(aContentDisposition, "name", charset, true, dummy);
            } catch (e) { }
        }
        if (fileName)
            return validateFileName (fileName);
        else
            return null;
    }
    return null;
}

function maybe_filename_from_url (aURI) {
    try {
        var url = aURI.QueryInterface(Components.interfaces.nsIURL);
        if (url.fileName != "") {
            // 2) Use the actual file name, if present
            var textToSubURI = Components.classes["@mozilla.org/intl/texttosuburi;1"]
                .getService(Components.interfaces.nsITextToSubURI);
            return validateFileName(textToSubURI.unEscapeURIForUI(url.originCharset || "UTF-8", url.fileName));
        }
    } catch (e) {
        // This is something like a data: and so forth URI... no filename here.
    }
    return null;
}

function maybe_filename_from_document_title (aDocument) {
    if (aDocument) {
        var docTitle = validateFileName(aDocument.title).replace(/^\s+|\s+$/g, "");
        if (docTitle) {
            // 3) Use the document title
            return docTitle;
        }
    }
    return null;
}

function maybe_filename_from_url_last_directory (aURI) {
    // 5) If this is a directory, use the last directory name
    try {
    var path = aURI.path.match(/\/([^\/]+)\/$/);
    if (path && path.length > 1)
        return validateFileName(path[1]);
    return null;
    } catch (e) {
        return null;
    }
}

function maybe_filename_from_url_host (aURI) {
    if (aURI && 'host' in aURI)
        return aURI.host;
    return null;
}

function maybe_filename_from_localization_default () {
    try {
        return getStringBundle().GetStringFromName("DefaultSaveFileName");
    } catch (e) {
        return null;
    }
}

function getDefaultFileName (aURI, aDocument, aContentDisposition) {
    return (maybe_filename_from_content_disposition (aContentDisposition, getCharsetforSave(aDocument)) ||
            maybe_filename_from_url (aURI) ||
            maybe_filename_from_document_title (aDocument) ||
            maybe_filename_from_url_last_directory (aURI) ||
            maybe_filename_from_url_host (aURI) ||
            maybe_filename_from_localization_default () ||
            "index");
}

/**
 * Determine what the 'default' path is for operations like save-page.
 * Returns an nsILocalFile.
 * @param url_o nsIURI of the document being saved.
 * @param aDocument The document to be saved
 * @param aContentType The content type we're saving, if it could be
 *        determined by the caller.
 * @param aContentDisposition The content-disposition header for the object
 *        we're saving, if it could be determined by the caller.
 * @param dest_extension_s To override the extension of the destination file,
 *        pass the extension you want here.  Otherwise pass null.  This is
 *        used by save_page_as_text.
 */
function generate_filename (url_o, aDocument, aContentType, aContentDisposition, dest_extension_s)
{
    var file_ext_s;
    var file_base_name_s;

    file_ext_s = maybe_get_url_extension (url_o);

    // Get the default filename:
    var file_name_s = getDefaultFileName(url_o, aDocument, aContentDisposition);

    // If file_ext_s is still blank, and url_o is a web link (http or
    // https), make the extension `.html'.
    if (! file_ext_s && !aDocument && !aContentType && (/^http(s?)/i.test(url_o.scheme))) {
        file_ext_s = ".html";
        file_base_name_s = file_name_s;
    } else {
        file_ext_s = getDefaultExtension(file_name_s, url_o, aContentType);
        // related to temporary fix for bug 120327 in getDefaultExtension
        if (file_ext_s == "")
            file_ext_s = file_name_s.replace (/^.*?\.(?=[^.]*$)/, "");
        file_base_name_s = file_name_s.replace (/\.[^.]*$/, "");
    }

    if (dest_extension_s)
        file_ext_s = dest_extension_s;

    var file_name_o  = conkeror.default_directory.clone();
    file_name_o.append (file_base_name_s +'.'+ file_ext_s);
    return file_name_o;
}



/*
 *  COMMANDS
 */


function save_focused_link (url_o, dest_file_o)
{
    download_uri_internal (
        url_o,
        null,        // document_o
        dest_file_o,
        null,        // dest_data_dir_o
        null,        // referrer_o
        null,        // post_data_o
        null,        // content_type_s
        true,        // should_bypass_cache_p
        false,       // save_as_text_p
        false);      // save_as_complete_p
}
interactive ("save-focused-link", save_focused_link,
             ['focused_link_url_o',
              ['F', function (a) { return "Save Link As: "; },
               function (args) {
                   return generate_filename (args[0]).path;
               },
               "save"]]);


function save_image (url_o, dest_file_o)
{
    download_uri_internal (
        url_o,
        null,        // document_o
        dest_file_o,
        null,        // dest_data_dir_o
        null,        // referrer_o
        null,        // post_data_o
        null,        // content_type_s
        false,       // should_bypass_cache_p
        false,       // save_as_text_p
        false);      // save_as_complete_p
}
interactive ("save-image", save_image,
             ['image_url_o',
              ['F', function (a) { return "Save Image As: "; },
               function (args) {
                   return generate_filename (args[0]).path;
               },
               "save"]]);


function save_page (document_o, dest_file_o)
{
    var url_o = makeURL (document_o.documentURI);
    var content_type_s = document_o.contentType;
    download_uri_internal (
        url_o,
        document_o,
        dest_file_o,
        null,   // dest_data_dir_o
        null,   // referrer_o
        null,   // post_data_o
        content_type_s,
        false,  // should_bypass_cache_p
        false,  // save_as_text_p
        false); // save_as_complete_p
}
interactive("save-page", save_page,
            ['active_document',
             ['F', function (a) { return "Save Page As: "; },
              function (args) {
                  var document_o = args[0];
                  var url_o = makeURL (document_o.documentURI);
                  var content_type_s = document_o.contentType;
                  var content_disposition = get_document_content_disposition (document_o);
                  return generate_filename (
                      url_o,
                      document_o,
                      content_type_s,
                      content_disposition).path;
              },
              "save"]]);


function save_page_as_text (document_o, dest_file_o)
{
    var url_o = makeURL (document_o.documentURI);
    var content_type_s = document_o.contentType;
    var should_bypass_cache_p = true;//not sure...
    download_uri_internal (
        url_o,
        document_o,
        dest_file_o,
        null,   // dest_data_dir_o
        null,   // referrer_o
        null,   // post_data_o
        content_type_s,
        false,  //should_bypass_cache_p
        true,   // save_as_text_p
        false); // save_as_complete_p
}
interactive("save-page-as-text", save_page_as_text,
            ['active_document',
             ['F', function (a) { return "Save Page As: "; },
              function (args) {
                  var document_o = args[0];
                  var url_o = makeURL (document_o.documentURI);
                  var content_type_s = document_o.contentType;
                  var content_disposition = get_document_content_disposition (document_o);
                  return generate_filename (
                      url_o,
                      document_o,
                      content_type_s,
                      content_disposition,
                      'txt').path;
              },
              "save"]]);


function save_page_complete (document_o, dest_file_o, dest_data_dir_o)
{
    var url_o = makeURL (document_o.documentURI);
    var content_type_s = document_o.contentType;
    download_uri_internal (
        url_o,
        document_o,
        dest_file_o,
        dest_data_dir_o,
        null,   // referrer_o
        null,   // post_data_o
        content_type_s,
        false,  // should_bypass_cache_p
        false,  // save_as_text_p
        true);  // save_as_complete_p
}
interactive("save-page-complete", save_page_complete,
            ['active_document',
             ['F', function (a) { return "Save Page As: "; },
              function (args) {
                  var document_o = args[0];
                  var url_o = makeURL (document_o.documentURI);
                  var content_type_s = document_o.contentType;
                  var content_disposition = get_document_content_disposition (document_o);
                  return generate_filename (
                      url_o,
                      document_o,
                      content_type_s,
                      content_disposition).path;
              },
              "save"],
             ['F', function (a) { return "Data Directory: "; },
              function (args) { return args[1].path + ".support"; },
              "save"]]);
