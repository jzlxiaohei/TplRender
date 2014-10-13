describe('test without z-if z-repeat,should replace {{placeholder}}',function() {

    it('wrong should be removed,and right should be there', function () {
        var f = jasmine.getFixtures();
        f.fixturesPath = 'base/test/fixtures'
        f.load('z-repeat.html');
        var ele = $('#repeat')[0]
        var data={
            animals:[
                {type:'cat',name:'tom',className:'animal'},
                {type:'dog',name:'qiqi',className:'animal'},
                {type:'pig',name:'god',className:'animal'},
                {type:'pig',className:'animal'},
                {type:'pig',className:'animal'},
                {type:'pig',className:'animal'}
            ]
        }
        TplRender(ele,data);
        expect($(ele).find('.animal').length).toBe(6);
        expect($(ele).find('.type').length).toBe(6);
        expect($(ele).find('.name').length).toBe(3);
        expect($(ele).find('.type')[0].textContent).toBe('cat');
        expect($(ele).find('.name')[1].textContent).toBe('qiqi');
        expect($(ele).find('.type')[5].textContent).toBe('pig');

    })

})