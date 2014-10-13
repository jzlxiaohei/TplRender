describe('test without z-if z-repeat,should replace {{placeholder}}',function() {

    it('wrong should be removed,and right should be there', function () {
        var f = jasmine.getFixtures();
        f.fixturesPath = 'base/test/fixtures'
        f.load('z-if.html');
        var ele = $('#if')[0]
        var data={
            cond:{
                wrong:false,
                right:true
            }
        }
        TplRender(ele,data);
        expect($(ele).find('.wrong').length).toBe(0)
        expect($(ele).find('.right').length).toBe(1)
    })

})
