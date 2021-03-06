/*
 * Copyright (c) 2009, 2010, 2011, 2012, B3log Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview KindEditor
 *
 * @author <a href="mailto:LLY219@gmail.com">Liyuan Li</a>
 * @version 1.0.0.2, Jun 19, 2012
 */
admin.editors.KindEditor = {
    /*
     * @description 初始化编辑器
     * @param conf 编辑器初始化参数
     * @param conf.kind 编辑器类型
     * @param conf.id 编辑器渲染元素 id
     * @param conf.fun 编辑器首次加载完成后回调函数
     */
    init: function (conf) {
        var language = "zh_CN";
        if ("en_US" === Label.localeString) {
            language = "en"
        } 
        
        if (conf.kind && conf.kind === "simple") {
            try {
                this[conf.id] = KindEditor.create('#' + conf.id, {
                    langType : language,
                    resizeType: 0, 
                    items: ["bold", "italic", "underline", "strikethrough", "|", "undo", "redo", "|", 
                    "insertunorderedlist", "insertorderedlist",
                    ]
                });
            } catch (e) {
                $("#tipMsg").text("KindEditor load fail");
            }
        } else {
            try {
                this[conf.id] = KindEditor.create('#' + conf.id, {
                    langType : language,
                    items: ["formatblock", "fontname", "fontsize", "|", "bold", "italic", "underline", "strikethrough", "forecolor", "|",
                    "link", "unlink", "image", "media", "|", "pagebreak", "emoticons", "code", "/",
                    "undo", "redo", "|", "insertunorderedlist", "insertorderedlist", "indent", "outdent", "|", 
                    "justifyleft", "justifycenter", "justifyright", "justifyfull", "|", "plainpaste", "wordpaste", "|", 
                    "clearhtml", "source", "preview"
                    ],
                    afterCreate: function () {
                        // TODO: chrome bug
                        window.onhashchange = admin.setCurByHash;
                        if (typeof(conf.fun) === "function") {
                            conf.fun();
                        }
                    }
                });
            } catch (e) {
                $("#tipMsg").text("KindEditor load fail");
            }
        }
    },
    
    /*
     * @description 获取编辑器值
     * @param {string} id 编辑器id
     * @returns {string} 编辑器值
     */
    getContent: function (id) {
        var content = "";
        try {
            content = this[id].html();
        } catch (e) {
            content = $("#" + id).val();
        }
        return content;
    },
    
    /*
     * @description 设置编辑器值
     * @param {string} id 编辑器 id
     * @param {string} content 设置编辑器值
     */
    setContent: function (id, content) {
        try {
            this[id].html(content);
        } catch (e) {
            $("#" + id).val(content);
        }
    }
};
