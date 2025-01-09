import { useSelector } from 'react-redux';

const AdminProfile = () => {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <div className="admin-profile">
            <div className="profile-field">
                <span className="field-label">Name:</span>
                <span className="field-value">{currentUser.name}</span>
            </div>
            <div className="profile-field">
                <span className="field-label">Email:</span>
                <span className="field-value">{currentUser.email}</span>
            </div>
            <div className="profile-field">
                <span className="field-label">School:</span>
                <span className="field-value">{currentUser.schoolName}</span>
            </div>
            <style jsx>{`
                .admin-profile {
                    padding: 20px;
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .profile-field {
                    margin-bottom: 15px;
                    display: flex;
                    align-items: center;
                }
                .field-label {
                    font-weight: bold;
                    min-width: 80px;
                    color: #666;
                }
                .field-value {
                    margin-left: 10px;
                    color: #333;
                }
            `}</style>
        </div>
    )
}

export default AdminProfile