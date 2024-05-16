import './css/ReminderHomePage.css';
import ReminderList from './ReminderList';

const ReminderHomePage = () => {

    return (
        <div className="scroll-page reminder-page">
            <ReminderList />
        </div>
    );
};

export default ReminderHomePage;
