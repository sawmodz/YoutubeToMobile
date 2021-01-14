/*global chrome*/
import React from 'react'
import './App.css'
const QRCode = require('qrcode.react')
let currentSecond = '0'

export default class Notfound extends React.PureComponent {
  state={
    currentWindows:"Current",
    currentTime:'0'
  }
  componentDidMount(){
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
      let url = tabs[0].url
      let tab = tabs[0]
      this.setState({currentWindows:url})
      chrome.tabs.executeScript(tab.id, {
        code: 'document.querySelector(".ytp-time-current").textContent'
      }, (results)=>{
        if(this.state.currentWindows.includes('youtube')){
          let h1=results +""
          let secondes = "0"
          if(h1.split(':')[1] == '01' || h1.split(':')[1] == '02' || h1.split(':')[1] == '03'|| h1.split(':')[1] == '04'|| h1.split(':')[1] == '05'|| h1.split(':')[1] == '06' || h1.split(':')[1] == '08' || h1.split(':')[1] == '09'){
            secondes = h1.split(':')[1].replace('0','')
          }else if (h1.split(':')[1] == '00'){
            secondes = "0"
          }else{
            secondes = h1.split(':')[1]
          }
          let seconde = parseInt(h1.split(':')[0])*60 + parseInt(secondes)
          this.setState({currentTime:('&t='+seconde)})
          document.querySelector("#id1").innerHTML = "<p>Titre : " + tab.title + "</p><p>Time : " + h1.split(':')[0] + " minutes, " + secondes + " secondes" + "</p><a target='_blank' rel='noopener noreferrer' href='"+this.state.currentWindows + this.state.currentTime+"'>Lien : Clique ici" + "</a>" ;
        }else{
          this.setState({currentTime:''})
        }
      })
    })
  }
  render () {
    return (
      <div>
        <h1 className='Titre'>QRCODE</h1>
        <QRCode className='qrcode' value={this.state.currentWindows + this.state.currentTime} />
        <div id="id1">Isn't Youtube page</div>
      </div>
    )
  }
}

