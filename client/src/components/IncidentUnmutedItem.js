export const IncidentUnmutedItem = ({msg}) => {
  const {comment, incident} = msg;

  return(
    <li className="py-3">
      <h5>Incident Unmuted</h5>
      <p className="mb-2">Comment: {comment}</p>
      <div className="d-flex flex-column text-secondary">
        <small>Status: {incident.status}</small>
      </div>
    </li>
  )
}