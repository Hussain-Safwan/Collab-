import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import StreamContext from '../../context/streams/StreamContext'

const StreamItems = (props) => {
  const { _id, title, participents } = props.stream
  const streamContext = useContext(StreamContext)
  const { selectStream, deleteStream } = streamContext

  const history = useHistory()

  const chooseStream = e => {
    selectStream(props.stream)
    history.push('/chat')
  }

  const handleDelete = e => {
    deleteStream(props.stream)
  }

  return (
    <div>
        <li class="collection-item avatar" onClick={chooseStream}>
          <img src={`https://robohash.org/${_id}?set=set4`} alt="" class="circle"/>
          <span class="title">{ title }</span>
          <p style={{color: 'gray'}}>{ participents.length } Homiez</p>
          <a href="#!" class="secondary-content" onClick={handleDelete}><i class="material-icons">delete</i></a>
        </li>
    </div>
  )
}

export default StreamItems
