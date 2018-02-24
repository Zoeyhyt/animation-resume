

var result = `
    /* 面试官你好，我是XXX
    * 我将以动画的形式来介绍我自己
    * 只用文字介绍太单调了
    * 我就用代码来介绍吧

    * 首先准备一些样式 
    */
    *{transition:all 1s;}
    html{
        background:rgb(222,222,222);
        font-size:16px;
    }
    #code{
        border:1px solid red;
        padding:16px;
    }

    /*我需要一点代码高亮*/
    .token.selector{
        color:#690;
    }
    .token.property{
        color:#905;
    }
    .token.function{
        color:#DD4A68;
    }

    /*加点3D效果吧*/
    #code{
        transform: rotate(360deg);
    }

    /*不玩了，我来介绍一下我自己吧*/
    /*我需要一张白纸*/
    #code{
        position:fixed;
        left:0;
        width:50%;
    }
`
var result2 = `
    #paper{
        position:fixed;
        right:0;
        width:50%;
        height:100%;
        background:black;
        display:flex;
        justify-content:center;
        align-items:center;
        padding:10px;
    }
    #paper >.content{
        background:white;
        width:100%;
        height:100%;
        padding:10px;
    }
`
var md =`
#标题1

##标题2

###我叫XXX，毕业于XXX大学XXX专业
`

writeCode('',result,()=>{
    createPaper(()=>{
        writeCode(result,result2,()=>{
            writeMarkdown(md)
        })
    })
})

function writeCode(prefix,code,fn){
    let domCode = document.querySelector('#code')
    let n = 0
    let id = setInterval(() =>{
        n += 1
        domCode.innerHTML = Prism.highlight(prefix+code.substring(0,n),Prism.languages.css);
        domCode.scrollTop = domCode.scrollHeight
        styleTag.innerHTML = prefix+code.substring(0,n)
        if(n >= code.length){
            window.clearInterval(id)
            fn.call()
        }
    },10)
}

function createPaper(fn){
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content =document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn.call()
}

function writeMarkdown(markdown){
    let domWords = document.querySelector('#paper >.content')
    let n = 0
    let id = setInterval(() =>{
        n += 1
        domWords.innerHTML = markdown.substring(0,n)
        domWords.scrollTop = domWords.scrollHeight
        if(n >= markdown.length){
            window.clearInterval(id)
        }
    },10)
}

