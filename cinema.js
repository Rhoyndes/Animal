import { positionPartBody } from '/animal.js'

class Cinema{
    constructor(){
        this.ghostBody = document.querySelector('.body')
        this.ghostBodyAnimation = document.querySelector('.body__chest')
        this.ghostRightEye = document.querySelector('.body__head-eyeRight')
        this.ghostLeftEye = document.querySelector('.body__head-eyeLeft')


        this.panelButtons = [...document.querySelectorAll('.panel-button-icon')]
        this.panelButtonsTop = [...document.querySelectorAll('.panel-button-icon-top')]
        this.partsOfBody = [...document.querySelectorAll('.screen__animal-el')]

        this.scene = document.querySelector('.screen__animal-off')
        this.loadingNumber = document.querySelector('.screen__animal-intro-number')
        this.sceneLeft = [...document.querySelectorAll('.screen__animal-intro div div')]
        this.loadingSceneOff = document.querySelector('.screen__animal-intro')

        this.moveAccess = true
        this.numerActive = 0
        this.positionLeft = 0
        this.timeLeftNumber = 3

        this.sceneOn = true

        this.init()
    }
    init(){
        this.intro()
        this.keyAction()
        this.keyCreateAnimal()
    }
    intro = () => {
        this.ghostBody.style.opacity = '1'
        this.ghostBody.style.left = '0'
        this.ghostBodyAnimation.style.animation = 'none'
        this.ghostBodyAnimation.style.borderRadius = `50% 50% 95% 5% / 18% 18% 82% 82%`
        this.ghostRightEye.style.display = 'block'
        setTimeout(() => {
            this.ghostBodyAnimation.style.animation = 'ghostMoving .7s ease-in-out infinite alternate'
            this.ghostRightEye.style.display = 'none'
        }, 500)
    }
    keyAction = () => {
        document.addEventListener('keyup', event => {
            if(this.moveAccess){
                if(event.key === 'ArrowRight' && this.positionLeft < 90){  
                    this.moveAccess = false 
                    this.numerActive++
                    this.positionLeft += 10
                    this.ghostRightEye.style.display = 'block'
                    this.ghostBody.style.left = `${this.positionLeft}%`
                    this.ghostBodyAnimation.style.animation = 'none'
                    this.ghostBodyAnimation.style.borderRadius = `50% 50% 95% 5% / 18% 18% 82% 82%`
                    setTimeout(() => {
                        this.ghostBodyAnimation.style.animation = 'ghostMoving .7s ease-in-out infinite alternate'
                        this.ghostRightEye.style.display = 'none'
                        this.moveAccess = true
                    }, 500)
                    this.activeButton()
                }
                if(event.key === 'ArrowLeft' && this.positionLeft > 0){
                    this.moveAccess = false
                    this.numerActive--
                    this.positionLeft -= 10
                    this.ghostLeftEye.style.display = 'block'
                    this.ghostBody.style.left = `${this.positionLeft}%`
                    this.ghostBodyAnimation.style.animation = 'none'
                    this.ghostBodyAnimation.style.borderRadius = `50% 50% 5% 95% / 18% 18% 82% 82%`
                    setTimeout(() => {
                        this.ghostBodyAnimation.style.animation = 'ghostMoving .7s ease-in-out infinite alternate'
                        this.ghostLeftEye.style.display = 'none'
                        this.moveAccess = true
                    }, 500)
                    this.activeButton()
                }
            }
        })
    }
    activeButton = () => {
        this.panelButtons.forEach(btn => {
            btn.style.border = ''
        })
        if(this.numerActive > 0 && this.numerActive < 9){
            this.panelButtons[this.numerActive - 1].style.border = '2px solid yellow'
        }
    }
    createAnimal = () => {
        this.partsOfBody.forEach((part, id) => {
            part.style.opacity = '1'
            part.style.left = positionPartBody[this.numerActive - 1][id].left
            part.style.top = positionPartBody[this.numerActive - 1][id].top
            part.style.height = positionPartBody[this.numerActive - 1][id].height
            part.style.borderRadius = positionPartBody[this.numerActive - 1][id].borderRadius
            part.style.width = positionPartBody[this.numerActive - 1][id].width
            })
    }
    keyCreateAnimal = () => {
        document.addEventListener('keyup', event => {
            this.panelButtons.forEach(e => {
                if(e.style.border !== '' && event.key === 'Enter'){
                    if(this.sceneOn){
                        this.scene.style.display = 'none'
                        setTimeout(() => {
                            this.sceneOnFunction()
                        }, 250)
                    }
                    this.sceneOn = false
                    this.panelButtonsTop.forEach(item => {
                        item.style.width = '90%'
                        item.style.height = '90%'
                    })
                    this.panelButtonsTop[this.numerActive - 1].style.width = 'calc(100% - 2px)'
                    this.panelButtonsTop[this.numerActive - 1].style.height = 'calc(100% - 2px)'
                    this.createAnimal()
                }
            })
        })
    }
    sceneOnFunction = () => {
        this.loadingNumber.textContent = this.timeLeftNumber
        this.sceneLeft[2].style.rotate = '90deg'
        setTimeout(() => {
            this.sceneLeft[3].style.rotate = '90deg'
        }, 200)
        setTimeout(() => {
            this.sceneLeft[1].style.rotate = '90deg'
        }, 400)
        setTimeout(() => {
            this.sceneLeft[0].style.rotate = '90deg'
        }, 600)
        setTimeout(() => {
            this.sceneLeft.forEach(item => item.style.rotate = '0deg')
            this.timeLeftNumber--
        }, 800)
       
        let interval = setTimeout(() => {
                this.sceneOnFunction()
            }, 1000)
        if(this.loadingNumber.textContent == 1){
            clearInterval(interval)
            setTimeout(() => {
                this.loadingSceneOff.style.display = 'none'
                this.partsOfBody.forEach(part => part.style.display = 'block')
            }, 800)
        }
    }
}
const cinema = new Cinema()
