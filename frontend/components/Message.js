import React from 'react'
import { useSelector } from 'react-redux'

export default function Message(props) {
  const message = useSelector ((appState) => appState.infoMessage)
  return <div id="message">{props.message}</div>
}
