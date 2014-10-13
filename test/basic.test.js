describe('test without z-if z-repeat,should replace {{placeholder}}',function(){

    it('replace attr',function(){
        var f = jasmine.getFixtures();
        f.fixturesPath = 'base/test/fixtures'
        f.load('basic.html');
        var ele = $('#attr')[0]
        var data={className1:"red",className2:'blue','index':2333}
        new TplRender(ele,data);
        expect($(ele).hasClass('red')).toBe(true)
        expect($(ele).hasClass('blue')).toBe(true)
        expect($(ele).attr('data-index')).toBe('2333')
    })
    it('replace textContent',function(){
        var f = jasmine.getFixtures();
        f.fixturesPath = 'base/test/fixtures'
        f.load('basic.html');
        var ele = $('#text')[0]
        var data={p1:"text1",p2:'text2',p3:'text3',p4:'text4',greeting:'hello'}
        new TplRender(ele,data);
        expect($(ele).find('.p1').text()).toBe('text1')
        expect($(ele).find('.p2').text()).toBe('text2')
        expect($(ele).find('.p34').text()).toBe('text3-text4')
        expect(ele.childNodes[0].nodeValue=='hello')

    })
    it('replace attr and textContent',function(){
        var f = jasmine.getFixtures();
        f.fixturesPath = 'base/test/fixtures'
        f.load('basic.html');
        var ele = $('#attr-text')[0]
        var data={p1:"text1",p2:'text2',p3:'text3',p4:'text4',greeting:'hello',
            className1:"red",className2:'blue','index':2333}
        TplRender(ele,data);
        expect($(ele).hasClass('red')).toBe(true)
        expect($(ele).hasClass('blue')).toBe(true)
        expect($(ele).attr('data-index')).toBe('2333')
        expect($(ele).find('.p1').text()).toBe('text1')
        expect($(ele).find('.p2').text()).toBe('text2')
        expect($(ele).find('.p34').text()).toBe('text3-text4')
        expect(ele.childNodes[0].nodeValue=='hello')

    })
})
