export const IncidentMutedItem = ({msg}) => {
  const {comment, incident, reason} = msg;

  return(
    <li className="py-3">
      <h5>Incident muted</h5>
      <p className="mb-2">Comment: {comment}</p>
      <div className="d-flex flex-column text-secondary">
        <small>Status: {incident.status}</small>
        <small>Reason: {reason}</small>
      </div>
    </li>
  )
}