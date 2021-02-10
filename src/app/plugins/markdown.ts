import { BasePluginComponent } from 'src/interfaces/base-plugin-component';
import ace from 'ace-builds';
import 'ace-builds/webpack-resolver';
import md from 'markdown-it';
import emoji from 'markdown-it-emoji';
import sub from 'markdown-it-sub';
import sup from 'markdown-it-sup';
import footnote from 'markdown-it-footnote';
import mark from 'markdown-it-mark';
import ins from 'markdown-it-ins';
import container from 'markdown-it-container';
import abbr from 'markdown-it-abbr';
import deflist from 'markdown-it-deflist';
import taskLists from 'markdown-it-task-lists';
import namedCodeBlocks from 'markdown-it-named-code-blocks';
import highlightjs from 'markdown-it-highlightjs';
import toc from 'markdown-it-table-of-contents';
import hljs from 'highlight.js/lib/core';

declare let $: any;


export class AddMarkDownComponent implements BasePluginComponent {

    private editors: Map<string, ace.Ace.Editor>;
    // public mode = 'editor';
    private markdown;
    private emoji;

    constructor() {
        hljs.registerLanguage('actionscript', require('highlight.js/lib/languages/actionscript'));
        hljs.registerLanguage('apache', require('highlight.js/lib/languages/apache'));
        hljs.registerLanguage('armasm', require('highlight.js/lib/languages/armasm'));
        hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
        hljs.registerLanguage('asciidoc', require('highlight.js/lib//languages/asciidoc'));
        hljs.registerLanguage('avrasm', require('highlight.js/lib/languages/avrasm'));
        hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'));
        hljs.registerLanguage('clojure', require('highlight.js/lib/languages/clojure'));
        hljs.registerLanguage('cmake', require('highlight.js/lib/languages/cmake'));
        hljs.registerLanguage('coffeescript', require('highlight.js/lib/languages/coffeescript'));
        hljs.registerLanguage('c-like', require('highlight.js/lib/languages/c-like'));
        hljs.registerLanguage('c', require('highlight.js/lib/languages/c'));
        hljs.registerLanguage('cpp', require('highlight.js/lib/languages/cpp'));
        hljs.registerLanguage('arduino', require('highlight.js/lib/languages/arduino'));
        hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));
        hljs.registerLanguage('diff', require('highlight.js/lib/languages/diff'));
        hljs.registerLanguage('django', require('highlight.js/lib/languages/django'));
        hljs.registerLanguage('dockerfile', require('highlight.js/lib/languages/dockerfile'));
        hljs.registerLanguage('ruby', require('highlight.js/lib/languages/ruby'));
        hljs.registerLanguage('fortran', require('highlight.js/lib/languages/fortran'));
        hljs.registerLanguage('glsl', require('highlight.js/lib/languages/glsl'));
        hljs.registerLanguage('go', require('highlight.js/lib/languages/go'));
        hljs.registerLanguage('groovy', require('highlight.js/lib/languages/groovy'));
        hljs.registerLanguage('handlebars', require('highlight.js/lib/languages/handlebars'));
        hljs.registerLanguage('haskell', require('highlight.js/lib/languages/haskell'));
        hljs.registerLanguage('ini', require('highlight.js/lib/languages/ini'));
        hljs.registerLanguage('java', require('highlight.js/lib/languages/java'));
        hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
        hljs.registerLanguage('json', require('highlight.js/lib/languages/json'));
        hljs.registerLanguage('latex', require('highlight.js/lib/languages/latex'));
        hljs.registerLanguage('less', require('highlight.js/lib/languages/less'));
        hljs.registerLanguage('lisp', require('highlight.js/lib/languages/lisp'));
        hljs.registerLanguage('livescript', require('highlight.js/lib/languages/livescript'));
        hljs.registerLanguage('lua', require('highlight.js/lib/languages/lua'));
        hljs.registerLanguage('makefile', require('highlight.js/lib/languages/makefile'));
        hljs.registerLanguage('matlab', require('highlight.js/lib/languages/matlab'));
        hljs.registerLanguage('mipsasm', require('highlight.js/lib/languages/mipsasm'));
        hljs.registerLanguage('perl', require('highlight.js/lib/languages/perl'));
        hljs.registerLanguage('nginx', require('highlight.js/lib/languages/nginx'));
        hljs.registerLanguage('objectivec', require('highlight.js/lib/languages/objectivec'));
        hljs.registerLanguage('php', require('highlight.js/lib/languages/php'));
        hljs.registerLanguage('python', require('highlight.js/lib/languages/python'));
        hljs.registerLanguage('rust', require('highlight.js/lib/languages/rust'));
        hljs.registerLanguage('scala', require('highlight.js/lib/languages/scala'));
        hljs.registerLanguage('scheme', require('highlight.js/lib/languages/scheme'));
        hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'));
        hljs.registerLanguage('smalltalk', require('highlight.js/lib/languages/smalltalk'));
        hljs.registerLanguage('stylus', require('highlight.js/lib/languages/stylus'));
        hljs.registerLanguage('swift', require('highlight.js/lib/languages/swift'));
        hljs.registerLanguage('tcl', require('highlight.js/lib/languages/tcl'));
        hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'));
        hljs.registerLanguage('verilog', require('highlight.js/lib/languages/verilog'));
        hljs.registerLanguage('vhdl', require('highlight.js/lib/languages/vhdl'));
        hljs.registerLanguage('yaml', require('highlight.js/lib/languages/yaml'));
        hljs.initHighlightingOnLoad();
        this.markdown = md({
            html: true,        // Enable HTML tags in source
            xhtmlOut: true,        // Use '/' to close single tags (<br />).
            // This is only for full CommonMark compatibility.
            breaks: false,        // Convert '\n' in paragraphs into <br>
            langPrefix: 'language-',  // CSS language prefix for fenced blocks. Can be
            // useful for external highlighters.
            linkify: true,        // Autoconvert URL-like text to links

            // Enable some language-neutral replacement + quotes beautification
            // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
            typographer: true,

            // Double + single quotes replacement pairs, when typographer enabled,
            // and smartquotes on. Could be either a String or an Array.
            //
            // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
            // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
            quotes: '“”‘’',

            // Highlighter function. Should return escaped HTML,
            // or '' if the source string is not changed and should be escaped externally.
            // If result starts with <pre... internal wrapper is skipped.
            highlight: this.highlightOption
        });
        // this.emoji  = emoji();
        this.markdown.use(emoji);
        this.markdown.use(sub);
        this.markdown.use(sup);
        this.markdown.use(footnote);
        this.markdown.use(mark);
        this.markdown.use(ins);
        this.markdown.use(container);
        this.markdown.use(abbr);
        this.markdown.use(deflist);
        this.markdown.use(taskLists, { label: true, labelAfter: true });
        this.markdown.use(highlightjs, { hljs, inline: true});
        this.markdown.use(namedCodeBlocks);
        this.markdown.use(toc);
        this.editors = new Map();
     }

    addToolBox = (uid) => {
        $(`#original-${uid}`).attr('contenteditable', false);
        $(`#original-${uid}`).append(`
            <nav>
            <div class="nav nav-tabs" id="md-nav-tab-${uid}" role="tablist">
                <a class="nav-item nav-link active" id="md-nav-home-tab-${uid}" data-toggle="tab" href="#md-nav-edit-${uid}" role="tab" aria-controls="nav-edit" aria-selected="true">Edit</a>
                <a class="nav-item nav-link" id="md-nav-profile-tab-${uid}" data-toggle="tab" href="#md-nav-preview-${uid}" role="tab" aria-controls="nav-preview" aria-selected="false">Preview</a>
            </div>
            </nav>
            <div class="tab-content" id="md-nav-tabContent-${uid}">
            <div class="tab-pane fade show active" id="md-nav-edit-${uid}" role="tabpanel" aria-labelledby="md-edit-tab"></div>
            <div class="tab-pane fade markdown-body" id="md-nav-preview-${uid}" role="tabpanel" aria-labelledby="md-preview-tab" style="padding-top: 20px;"></div>
            </div>
        `);
        ace.config.set('fontSize', '14px');
        $(`#md-nav-edit-${uid}`).css({
            position: 'relative',
            width: $(`#original-${uid}`).width(),
            height: '390px',
            resize: 'vertical'
        });
        // ace.config.set('basePath', srcNoconflict);
        this.editors.set(uid, ace.edit(`md-nav-edit-${uid}`));
        const editor = this.editors.get(uid);
        editor.session.setMode('ace/mode/markdown');
        // editor.setTheme('ace/mode/github');
        editor.session.setValue('<!--- Enter your markdown code here --->\n');
        editor.focus();
        editor.navigateFileEnd();
        // Changing Markdown Preview to match code in the Editor Tab
        $(`#md-nav-profile-tab-${uid}`).click(() => {
            const outHtml = this.markdown.render(editor.session.getValue());
            $(`#md-nav-preview-${uid}`).empty().append(outHtml);
        });
        // To set focus to editor
        $(`#md-nav-home-tab-${uid}`).click(() => {
            editor.focus();
        });
    }
    highlightOption(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>';
            } catch (__) { }
        }

        return '<pre class="hljs"><code>' + this.markdown.utils.escapeHtml(str) + '</code></pre>';
    }
    getContent(uid): string {
        if (this.editors.has(uid)){
        return this.editors.get(uid).session.getValue(); }
        else{return ''; }
    }
    setContent(uid, content: string){
        if (this.editors.has(uid)){
            this.editors.get(uid).session.setValue(content);
            // To Show Preview by default
            $(`#md-nav-profile-tab-${uid}`).trigger('click');
        }
        else{
            this.addToolBox(uid);
            this.editors.get(uid).session.setValue(content);
            // To Show Preview by default
            $(`#md-nav-profile-tab-${uid}`).trigger('click');
        }
    }
}
