
var result = `
    /* 面试官你好，我是何钰婷
    * 我将以动画的形式来介绍我自己
    * 只用文字介绍太单调了
    * 我就用代码来介绍吧
    */

    /* 首先准备一些样式 */

    *{transition:all .5s;}
    /* 先加一个背景吧 */
    html{
        color:#0E1F37;
        background:#FDF5ED;
        font-size:16px;
    }
    #code{
        border:1px solid #BEC5D6;
        padding:16px;
        margin:18px;
        overflow:auto;
        width: 45%;
        height:90vh;
    }

    /*我需要一点代码高亮*/
    .token.selector{
        color:#690;
    }
    .token.property{
        color:#905;
    }
    .token.punctuation{
        color:#05142B;
    }
    .token.function{
        color:#0E1F37;
    }

    /*加点3D效果吧*/
    html {
        perspective: 1000px;
    }
    #code{
        transition: none;
        transform: rotateY(10deg) translateZ(-100px);
    }

    /*不玩了，我来介绍一下我自己吧*/
    /*我需要一张简历*/
    #code{
        position:fixed;
        left:0;
        width:45%;
    }

    #paper >.content{
        background:#193F43;
        width:100%;
        height:100%;
        padding:20px;
        color:#F4F4F4;
        display:block;
        overflow:auto;
    }



`

var result2 =`
    /* 好像还差点什么
    * 对了，这是 Markdown 格式的，我需要变成对 HR 更友好的格式
    *那就让我们来翻译一下吧！
    */
    
    
    `

var result3 =`
    /*
    * 这就是我的会动的简历
    * 谢谢观看
    */`

var md =`
# 自我介绍
***   

我叫 XXX 1994 年 5 月出生， XXX 学校毕业，自学前端半年，希望应聘前端开发岗位
   

## 技能介绍
***   

- HTML
- CSS
- JavaScript
- jQuery
- Vue.js
   

## 项目介绍
***   

1.xx轮播
2.xx简历
3.xx画板
   

## 链接
***   

- Github
- Blog
   

## 联系方式
***   

- 手机：189xxxxxxxx
- QQ: xxxxxxxxxx
`

writeCode('',result,()=>{
    createPaper(()=>{
        writeMarkdown(md,()=>{
            writeCode(result,result2,()=>{
                turnToHTML(md,()=>{
                    writeCode(result+result2,result3,()=>{
                        console.log('done')
                    })
                })
            })
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


function writeMarkdown(markdown,fn){
    let domWords = document.querySelector('#paper >.content')
    let n = 0
    let id = setInterval(() =>{
        n += 1
        domWords.innerHTML = markdown.substring(0,n)
        domWords.scrollTop = domWords.scrollHeight
        if(n >= markdown.length){
            window.clearInterval(id)
            fn.call()
        }
    },10)
}

function turnToHTML(md,fn){
    let markdownContainer = document.querySelector('#paper >.content')
    markdownContainer.innerHTML = marked(md)
    markdownContainer.scrollTop = markdownContainer.scrollHeight
    fn.call()
}

