<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>播放器</title>
        <link rel="stylesheet" href="播放器.css" type="text/css"/>
        <script src="jquery.min.js">
        </script>
        <script src=lrc.js></script>
    </head>
    <body>
        <div class="containner">
            <div class="frass">
            </div>
            <div class="music-content">
                <div class="cut-ofRule">
                    MONY音乐
                <!-- <input class="reserch" placeholder="搜索音乐、歌手">
                <div class="go-button" type="button"> &gt; </div> -->
                </div>
                <div class="currentMusic">

                </div>
                <div class="lrc-containner">
                  <ul class="song-words-list">

                  </ul>
                </div>
                <div class="currentImgDiv">
                    <img class="currentImg" src="image/suxing.jpg" alt="" />
                </div>
            </div>
            <div class="music-collectLoad">
                <img class="join collect" src="image/收藏.png" alt="" />
                <img class="join download" src="image/下载.png" alt="" />
                <img class="join omments" src="image/评论.png" alt="" />
                <img class="join skinchange" src="image/换肤.png" alt="" />
            </div>
            <!-- 上下曲、暂停播放 -->
            <div class="controls">
                <div class="music-control">
                    <!--播放模式切换  -->
                    <div class="play-mode" data-index='0'>
                        <img class="mode order mode-active" src="image/顺序播放.png">
                        <img class="mode shuffle" src="image/随机播放.png">
                        <img class="mode repeat-once" src="image/单曲循环.png">
                    </div>
                    <a class="play play-prev" href="#" alt="上一曲"></a>
                    <a class="play-pause" href="#" alt="暂停"></a>
                    <a class="play play-next" href="#" alt="下一曲"></a>
                    <a class="list-button" href="#" alt="播放列表"></a>
                    <!-- 音乐 -->
                    <audio class="audio">
                    </audio>
                </div>
                <!--滑条部分-->
                <div class="slider-container">
                    <time class="currentTime">0:00</time>
                    <input class="invisibleSlider" step=0.01 type="range" value="0" max="1000" min="0">
                    <div class="visible-containner">
                        <div class="visibleSlider">
                            <div class="line">
                            </div>
                            <div class="outsideCircle">
                                <div class="indexCircle">
                                </div>
                            </div>
                        </div>
                    </div>
                    <time class="duration"></time>
                </div>
            </div>
            <div class="listContainner">
                <ul class="ul-list"></ul>
            </div>
        </div>
            <script>
            // console.log('tanya', tanya)
            var musicList = ['蔡健雅 - 被驯服的象.mp3', 'Kara - 不懂不懂.mp3',  '白雅言 - 爱情学概论.mp3', '苏醒 - 晚安亲爱的.mp3', '蔡依林 - 小伤口.mp3', '曾静玟 - 不快乐.mp3']
            var imagesList = ['tanya.jpg', 'kara.jpg', 'yayan.jpg', 'suxing.jpg', 'jolin.jpg', 'jywen.jpg']
            var skinList = [['black', 'rgb(20, 44, 64)'], ['gray', '#1b1919'], ['rgb(20, 44, 64)', 'gray'], ['rgb(230, 125, 170)', '#ce87a6']]
            // 默认歌曲播放图片
            $('.currentImg').attr('src', `image/${imagesList[0]}`)
            // 默认歌曲
            $('.audio').attr('src', `music/${musicList[0]}`)
            // audio默认index
            $('.audio').attr('data-index', 0)
            // 换肤默认index
            $('.skinchange').attr('data-index', 0)
            var mode = 0
            var msconds = Object.keys(hmAndGeCi).map(function(e){
              // console.log(e)
              return Number(e)
            })

            var test = function() {
              // hmAndGeCi为key为时间（毫秒），value为对应的歌词的对象
              // 用Object.keys方法得到对象的keys,并将其转换为数字
              // var msconds = Object.keys(hmAndGeCi).map(function(e){
                // console.log(e)
                // return Number(e)
              // })


              // 获取存放歌词的元素
              var lrcContainer = $('.song-words-list')
              // 定义一个空字符串用以存放歌词
              var res = ''
              for (var i = 0; i < msconds.length; i++) {
                // 遍历添加歌词到tres中
                  res += `<li class="li-song-word">${hmAndGeCi[msconds[i]]}</li>`
              }
              // console.log('res', res)
              lrcContainer.append(res)
              //得到一个有由每句歌词组成的数组
              var words = $('.li-song-word')
              console.log('word', words);
              return words
            }
            // test()

            // 下一曲、上一曲、暂停
            var bindPlayClick = function() {
                // 下一曲
                $('.play-next').on('click', function() {
                    play(1)
                    $('.audio')[0].play()
                    switchPlayPicture()
                    // 点击上一曲时，先取消动画效果
                    cancelRotate()
                })

                // 上一曲
                $('.play-prev').on('click', function() {
                    play(-1)
                    $('.audio')[0].play()
                    switchPlayPicture()
                    // 点击上一曲时，先取消动画效果
                    cancelRotate()
                })

                // 播放与暂停播放
                $('.play-pause').on('click', function() {
                    var isPaused = $('.audio').prop('paused')
                    // console.log('isPaused', $('.audio').prop('paused'));
                    if (isPaused === true) {
                        $('.audio')[0].play()
                        $('.play-pause').css('background-image', 'url(image/播放.png)')
                        // 歌曲播放时，图片开始旋转
                        addRotate()
                    } else {
                        $('.audio')[0].pause()
                        $('.play-pause').css('background-image', 'url(image/暂停.png)')
                        // 设置动画暂停
                        $('.currentImgDiv').css('animation-play-state','paused')
                    }
                })
            }

            // 给播放模式按钮添加click事件，点击此按钮时，切换播放模式
            var bindModeSwitch = function() {
                $('.mode').on('click', function() {
                    modeSwitch()
                })

            }

            // 当点击播放模式按钮以后，歌曲播放结束，按当前的模式播放歌曲
            // 歌曲播放结束以后，要做两件事，按照当前模式下播放歌曲，再将更改当前播放歌曲的名称
            var bindAudioEnded = function() {
                $('.audio').on('ended', function() {
                    playMode(mode)
                })
            }

            // 播放列表添加click事件，点击播放列表图标，实现播放列表的打开和关闭
            var bindListClick = function() {
                $('.list-button').on('click', function() {
                    // console.log('222');
                    var display = $('.listContainner').css('display')
                    // console.log('display', display);
                    if (display === 'none') {
                        $('.listContainner').css('display', 'block')
                        // console.log('2', $('.listContainner').css('display'));
                    } else {
                        // console.log('000');
                        $('.listContainner').css('display', 'none')
                    }
                })
            }

            //点击选中列表中的歌曲，即可播放该歌曲
            var bindSongClick = function() {
                $('.ul-list').on('click', function() {
                    var target = $(event.target)
                    console.log('target', target);
                    if (target.hasClass('li-song')) {
                        var index = target.data('index')
                        console.log('indexlist', index);
                        $('audio').attr('src',`music/${musicList[index]}`)
                        $('audio')[0].play()
                        $('audio').attr('data-index', index)
                        // 改变当前播放歌曲的图片
                        $('.currentImg').attr('src', `image/${imagesList[index]}`)
                        // 改变播放按钮为播放状态
                        $('.play-pause').css('background-image', 'url(image/播放.png)')
                        // 更改播放歌曲名称
                        switchNameOfMusic(index)
                        //首先取消动画效果，canplay状态下添加动画
                        cancelRotate()
                    }
                })
            }

            // 加载音频完成可以播放后触发的canplay事件
            var bindEAudioCanplay = function() {
                $('.audio').on('canplay', function() {
                    var audio = $('.audio')[0]
                    var words = test()
                    // 将Words赋值给audio的words
                    audio.words = words
                    // console.log('words', words)
                    // 获取ul元素的高度
                    var allWordsHeight = $('.song-words-list')[0].offsetHeight
                    // console.log('allWordsHeight', allWordsHeight)
                    // 设置audio的allWordsHeight和transformHeight，用于后面调用
                    audio.allWordsHeight = allWordsHeight
                    // 歌曲的歌词总行高 / 歌词的行数 = 单行的高度
                    audio.transformHeight = allWordsHeight / words.length
                    // console.log('transformHeight', audio.transformHeight)
                    // 算出当前播放歌曲的播放时长，添加到class为duration的元素开始之前
                    var currentDuration = $('.audio')[0].duration
                    var transDuration = formatTime(currentDuration)
                    console.log('duration', transDuration);
                    var d = `
                        ${transDuration}
                    `
                    console.log('d', d);
                    $('.duration').text(d)

                    // 判断当前的播放状态，如果是播放状态下，添图片的动画效果。
                    var isPaused = $('.audio').prop('paused')
                    if (isPaused === false) {
                      addRotate()
                    }
                })
            }

            // 制作滑条，当拖动滑条时，歌曲的播放进度随之改变
            var bindSliderInput = function() {
                $('.invisibleSlider').on('input', function(event) {
                    var target = $(event.target)
                    // width: 500px;
                    // targetWidth = '500px'
                    var targetWidth = target.css('width')
                    var targetLength = Number(targetWidth.slice(0, targetWidth.length - 2))
                    var max = target.attr('max')
                    var currentValue = target.val()
                    var ratio = currentValue / max
                    var lineWidth = targetLength * ratio
                    $('.line').css('width', lineWidth)
                    $('.indexCircle').css('left', `${lineWidth - 5}px`)

                    // 当前歌曲的音频总长，实现拖动滑条，歌曲的播放进度随之改变
                    var currentDuration = $('.audio')[0].duration
                    var currentTime = ratio * currentDuration
                    var transCurrentTime = formatTime(currentTime)
                    var t = `
                        ${transCurrentTime}
                    `
                    console.log('t', t);
                    $('.currentTime').text(t)
                    $('.audio')[0].currentTime = currentTime
                    console.log('yuyui', $('.currentTime').text());
                })
            }


            //  console.log('msconds', msconds)


            // 歌曲播放时，实时更新歌曲的播放进度，并进度条的进度与歌曲播放进度一致。
            var bindTimeUpdate = function() {
                $('.audio').on('timeupdate', function() {
                    var updatetime = $('.audio')[0].currentTime
                    // 将实时更新的时间 转换成毫秒，用于和歌词时间进行比较
                    var msUpdateTime = updatetime * 1000 + 100
                      // console.log('updatetime', updatetime * 1000)
                    var status = false
                    // 定义一个变量用以存放歌曲当前的歌词
                    var nowWords
                      // console.log(hmAndGeCi[updatetime * 1000])
                      // 循环遍历每一段歌词更新的时间组成的数组
                    for (var i = 0; i < msconds.length; i++) {
                      // console.log('u', hmAndGeCi[msconds[i]])
                      // 当歌词中的更新时间小于播放器更新的时间时，表示刚好播放到该句歌词
                      if (msconds[i] < msUpdateTime) {
                        status = true
                        // 当前播放的歌词
                        nowWords = hmAndGeCi[msconds[i]]
                        index = i
                        // 开始唱歌的时间
                        // mslrcTime = msconds[0]
                        // console.log('mslrcTime', mslrcTime);
                        // 歌曲播放当前的时间
                        msUpdateTime = updatetime * 1000
                        console.log('msUpdateTime',msUpdateTime);
                      }
                      else if (msUpdateTime < msconds[0]) {
                        status === false
                      }
                    }
                    if (status) {
                      // console.log('ts', nowWords)
                      // 设置歌词区域的歌词
                      // $('.lrcContainer').text(nowWords)
                      var words = $('.audio')[0].words
                      var transformHeight = $('.audio')[0].transformHeight
                      songWordShift(words, index, transformHeight)
                    }
                    if (status === false) {
                      // 设置播放后的歌曲的样式，
                      $('.li-song-word').css({
                        'font-size': '14px',
                        'color': 'white',
                      })
                      $('.song-words-list').css({
                        'top':'50%',
                      })
                    }


                    // 播放歌曲的当前时长
                    var transCurrentTime = formatTime(updatetime)
                    var c = `
                        ${transCurrentTime}
                    `
                    $('.currentTime').text(c)
                    // 改变滑条的进度
                    var target = $('.invisibleSlider')
                    var targetWidth = target.css('width')
                    var targetLength = Number(targetWidth.slice(0, targetWidth.length - 2))
                    // 当前歌曲的音频总长
                    var currentDuration = $('.audio')[0].duration
                    var ratio = updatetime / currentDuration
                    var lineWidth = targetLength * ratio
                    // 进度条根据
                    $('.line').css('width', lineWidth)
                    $('.indexCircle').css('left', `${lineWidth - 5}px`)
                })
            }

            // 歌词上移
            var songWordShift = function(words, index, transformHeight) {
            // var oldWord = words[index - 1]
            var currentWord = words[index]
            // ul列表移动的像素，为单行高度的倍数，每更新一次歌词时，移动行高像素
            var changeLineHeight = transformHeight * index
            // console.log('changeLineHeight',changeLineHeight);
            $('.song-words-list').css('transform',`translateY(-${changeLineHeight}px)`)
            $('.li-song-word').css({
              'font-size': '14px',
                'color': 'white',
            })
            // 当前播放个取得样式
            $(currentWord).css({
              'font-size': '18px',
              'color': 'orange',
            })

          }

            // 当点击播放列表以外的部分，关闭歌曲列表
            var bindlistoff = function() {
                $('.music-content').on('click', function() {
                    var display = $('.listContainner').css('display')
                    if (display === 'block') {
                        $('.listContainner').css('display', 'none')
                    }
                })
            }
            var bindskinClick = function() {
              // 给换肤标志添加click事件
              $('.skinchange').on('click', function() {
              var lengthOfskinList = skinList.length
              // 得到当前皮肤的index
              var index = $('.skinchange').data('index')
              // 点击一次换肤标志，index在原来的基础上面加1,
              var i = (index + 1 + lengthOfskinList) % lengthOfskinList
              // 更改皮肤，
              $('.containner').css('background',`-moz-radial-gradient(circle farthest-side, ${skinList[i][0]}, ${skinList[i][1]})`)
              $('.containner').css('background',`-webkit-radial-gradient(circle farthest-side, ${skinList[i][0]}, ${skinList[i][1]}`)
              // 设置当前皮肤的index为i
              $('.skinchange').data('index', i)
              })
            }

            var bindEvents = function() {
                // 上一曲、下一曲、暂停click事件
                bindPlayClick()
                // 播放模式click事件，实现歌曲播放模式的切换
                bindModeSwitch()
                // 歌曲的ended事件，歌曲播放结束以后按照当前的播放模式播放歌曲
                bindAudioEnded()
                // 点击播放列表图标，即弹出播放列表
                bindListClick()
                // 点击播放列表里面的某一首歌曲，即播放这首歌
                bindSongClick()
                // 歌曲加载完成以后，在滑条模块当前播放歌曲的播放时长
                bindEAudioCanplay()
                // 制作滑条，当拖动滑条时，歌曲的播放进度随之改变
                bindSliderInput()
                // 歌曲播放时，实时更新歌曲的播放进度，并进度条的进度与歌曲播放进度一致
                bindTimeUpdate()
                // 当点击播放列表以外的部分，关闭歌曲列表
                bindlistoff()
                // 切换播放器皮肤
                bindskinClick()
            }

            // 给play绑定click事件,同时将播放页面的歌曲名称改为当前播放歌曲
            var play = function(offset) {
                    var numberOfMusics = musicList.length
                    // console.log('src', $('.audio').attr('src'))
                    var index = $('.audio').data('index')
                    var i = (numberOfMusics + index + offset) % numberOfMusics
                    console.log('i', i);
                    // 将i的值赋值给index，data-index="i"
                    $('.audio').data('index', i)
                    $('audio').attr('src', `music/${musicList[i]}`)
                    // 切换当前播放的图片
                    $('.currentImg').attr('src', `image/${imagesList[i]}`)

                    //当点击上下曲时，class为music-content的元素text设当前歌曲名字
                    switchNameOfMusic(i)
            }

            // 点击歌曲播放列表里面的歌曲，切换页面歌曲名称为当前歌曲名称
            var switchNameOfMusic = function(i) {
              //当点击上下曲时，class为music-content的元素text设当前歌曲名字
              var ms = musicList[i].slice(0, musicList[i].length - 4)
              console.log('ms', ms);
              var m = `
                  ${ms}
              `
              $('.currentMusic').text(m)
            }

            // 判断当前的播放状态，如果是播放状态，将状态图标改为播放
            var switchPlayPicture = function() {
                var isPaused = $('.audio').prop('paused')
                // console.log('isPaused', $('.audio').prop('paused'));
                if (isPaused === false) {
                    $('.play-pause').css('background-image', 'url(image/播放.png)')
                }
            }

            // 播放模式切换函数
            var modeSwitch = function() {
                var numberOfModes = $('.mode').length
                var index = $('.play-mode').data('index')
                var i = (index + 1) % numberOfModes
                console.log('i', i);
                $('.play-mode').data('index', i)
                $('.mode-active').removeClass('mode-active')
                $($('.mode')[i]).addClass('mode-active')
                // 当前的模式
                var orderActive = $('.mode-active').hasClass('order')
                var shuffleActive = $('.mode-active').hasClass('shuffle')
                var repeatActive = $('.mode-active').hasClass('repeat-once')
                // 如果当前播放模式顺序播放，mode等于0
                if (orderActive === true) {
                    mode = 0
                // 如果当前播放模式随机循环，mode等于1
                } else if (shuffleActive === true) {
                    mode = 1
                // 如果当前播放模式为单曲播放，mode等于2
                } else if (repeatActive === true) {
                    mode = 2
                }
                // console.log('mode', mode);
            }

            // 各播放模式下执行的函数
            var playMode = function(m) {
                if (m === 0) {
                    play(1)
                    $('.audio')[0].play()
                    //首先取消动画效果，canplay状态下添加动画
                    cancelRotate()
                } else if (m === 1) {
                    random()
                    $('.audio')[0].play()
                    // 找到当前播放歌曲路径，截取其中的歌名部分，
                    var srcOfAudio = $('.audio').attr('src')
                    // console.log('srcOfAudio', srcOfAudio);
                    var lengthOfValue = srcOfAudio.length
                    var ms = srcOfAudio.slice(6,length-4)
                    // console.log('ms', ms);
                    // 将截取的歌名部分设置为当前播放歌名
                    var m = `
                        ${ms}
                    `
                    $('.currentMusic').text(m)
                    // 切换当前播放的图片为对应的歌手

                    //首先取消动画效果，canplay状态下添加动画
                    cancelRotate()
                } else {
                    single()
                    $('.audio')[0].play()
                    //首先取消动画效果，canplay状态下添加动画
                    cancelRotate()
                }
            }

            // 单曲播放
            var single = function() {
                $('.audio').loop
                // 两种方式可以实现歌曲的重复播放
                // $('.audio').currentTime = 0
            }

            // 随机播放,
            var random = function() {
                var r = Math.floor(Math.random() * musicList.length)
                $('.audio').attr('src', `music/${musicList[r]}`)
                $('.audio').attr('data-index', r)
                $('.currentImg').attr('src', `image/${imagesList[r]}`)
            }

            //格式化时间,将时间格式转化为 分 ：秒
            var formatTime = function(time) {
                var minutes = Math.floor(time / 60)
                var seconds = Math.floor(time % 60)
                if (seconds < 10) {
                    seconds = '0' + String(seconds)
                }
                // if (minutes < 10) {
                //     minutes = '0' + String(minutes)
                // }
                var t = `${minutes}:${seconds}`
                return t
            }

            // 页面加载时，music-content元素的text为当前歌曲名字，并添加列表的名称
            var load = function() {
                //1、 music-content元素的text为当前歌曲名字
                var index = $('.audio').data('index')
                var mss  = musicList[index].slice(0, musicList[index].length - 4)
                // console.log('ms', mss);
                var m = `
                    ${mss}
                `
                $('.currentMusic').text(m)
                // 2、页面加载时，向列表添加歌曲，
                var p = `
                    <div class='head'>列表</div>
                `
                $('.listContainner').prepend(p)
                // 点击列表，即向ul添加class,即弹出列表。
                $('.ul-list').addClass('ul-song')
                // 循环添加音乐列表里面的音乐
                for (var i = 0; i < musicList.length; i++) {
                    var music = musicList[i]
                    var l = music.length
                    var t = `
                        <li class='li-song' data-index= ${i}>${music.slice(0, 1 - 4)}</li>
                    `
                    $('.ul-song').append(t)
                }
            }

            // 增加CSS中的animation属性
            var addRotate = function() {
              $('.currentImgDiv').css('animation','rotate 13s linear infinite')
              $('.currentImgDiv').css('-webkit-animation','rotate 13s linear infinite')
              $('.currentImgDiv').css('-moz-animation','rotate 13s linear nfinite')
            }
            var cancelRotate = function() {
              $('.currentImgDiv').css('animation','none')
              $('.currentImgDiv').css('-webkit-animation','none')
              $('.currentImgDiv').css('-moz-animation','none')
            }

            var __main = function() {
                // 页面加载时，music-content元素的text为当前歌曲名字，并添加列表的名称
                load()
                // 绑定事件
                bindEvents()
            }
            // 调用主函数
            __main()
            </script>
            </div>
        </div>
    </body>
</html>
