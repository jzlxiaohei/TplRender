#TplRender

---
simple template render directly based on dom

---
#Demo

        <div id="repeat" class="{{repeat.className}}">
            <div z-repeat="animals" class="{{className}} animals">
                <span class="type">{{type}}</span>
                <span class="name" z-if="name">{{name}}</span>
            </div>
        </div>
        <script src='TplRender.js'></script>
        <script>
            var ele = document.getElementById('repeat')
            var data={
                repeat:{
                    className:'repeat'
                },
                animals:[
                    {type:'cat',name:'tom',className:'animal'},
                    {type:'dog',name:'qiqi',className:'animal'},
                    {type:'pig',name:'god',className:'animal'},
                    {type:'pig',className:'animal'},
                    {type:'pig',className:'animal'},
                    {type:'pig',className:'animal'}
                ]
            }
            var tpl = TplRender(ele,data);
            tpl.animals.$push({type:'code monkey',name:'程序猿~',className:'animal'})
        </script>

#Feature

- use {{replace_holder}} in dom directly

- `z-if` and `z-repeat` directive

- multi-level property(`data.x.y` will evaluate to `1` for `data={x:{y:1}}` )

- array `$push`,`$del` item(but each item is not allow changed)

#RoadMap

- support data change.(a simple dirty but worked edition has been implemented,some refactor needed)