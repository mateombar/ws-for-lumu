export const IncidentCommentItem = ({msg}) => {
  const {comment, incident} = msg;

  return(
    <li className="py-3">
      <h5>Incident commented</h5>
      <p className="mb-2">Comment: {comment}</p>
    </li>
  )
}