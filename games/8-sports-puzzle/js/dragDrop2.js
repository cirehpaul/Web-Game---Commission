import PositionElements from './positionElements2.js'

class DragDrop {
  constructor() {
    this.positionElements = new PositionElements()
    this.selected = 0
    this.dragDropEvents()
    this.points = { correct: 0, wrong: 0 }
    this.imageChange()
  }
  dragDropEvents() {
    const { draggableDivs, puzzleDivs, modal, modalText, modalBtn, attempt, cellsAmount } =
      this.positionElements.elements

    draggableDivs.forEach((draggableDiv, i) => {
      draggableDiv.addEventListener('dragstart', (e) => {
        this.selected = e.target
        console.log('dragstart')
      })
      puzzleDivs[i].addEventListener('dragover', (e) => {
        e.preventDefault()
        console.log('dragover')
      })
      puzzleDivs[i].addEventListener('drop', () => {
        if (puzzleDivs[i].children.length === 0) {
          this.selected.style.top = 0
          this.selected.style.left = 0
          this.selected.style.border = 'none'
          puzzleDivs[i].append(this.selected)

          if (this.selected.dataset.index === puzzleDivs[i].dataset.index) {
            this.points.correct = 0
            puzzleDivs.forEach((div) => {
              div.firstElementChild &&
                div.dataset.index === div.firstElementChild.dataset.index &&
                this.points.correct++
            })
          } else {
            this.points.wrong++
          }
          console.log(this.points)

          if (this.points.correct === cellsAmount) {
            modal.style.cssText = 'opacity: 1; visibility: visible;'
            attempt.textContent = this.points.wrong
            modalBtn.onclick = () => location.reload()
          }

          const found = puzzleDivs.find((div) => !div.firstElementChild)
          if (!found && this.points.correct < cellsAmount) {
            modal.style.cssText = 'opacity: 1; visibility: visible;'
            modalText.textContent = 'You Lost 😢. Please Try Again'
            modalBtn.onclick = () => location.reload()
          }
        }
      })
      puzzleDivs[i].addEventListener('dragenter', (e) => {
        puzzleDivs[i].classList.add('active')
      })
      puzzleDivs[i].addEventListener('dragleave', (e) => {
        console.log('leave')
        puzzleDivs[i].classList.remove('active')
      })
    })
  }

  imageChange() {
    const { finalImg, inputFile, draggableDivs } = this.positionElements.elements

    inputFile.addEventListener('change', (e) => {
      const url = URL.createObjectURL(inputFile.files[0])

      finalImg.style.backgroundImage = `url(${url})`

      draggableDivs.forEach((div) => {
        div.style.backgroundImage = `url(${url})`
      })

      this.points = { correct: 0, wrong: 0 }
    })
  }
}

export default DragDrop
