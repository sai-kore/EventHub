import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { getParticipants } from "../../services/registrationService";

function Participants() {
  const { id } = useParams();

  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    async function loadParticipants() {
      const data = await getParticipants(id);
      setParticipants(data.participants);
    }

    loadParticipants();
  }, [id]);

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-8">Participants</h1>

        <table className="w-full border">
          <thead>
            <tr>
              <th>Name</th>

              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {participants.map((user) => (
              <tr key={user._id}>
                <td>{user.user.name}</td>

                <td>{user.user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default Participants;
