/**
 * function calculate the date according to time zone
 * @param date
 * @returns
 */
export const dateFormat = (date: any) => {
    let date1: any = new Date(date);
    let date2: any = new Date();
    let time: any;

    const diffTime = Math.abs(date2 - date1);
    let days = diffTime / (1000 * 60 * 60 * 24);
    let hrs = Math.round(diffTime / (1000 * 60 * 60));
    let min = Math.round(diffTime / (1000 * 60));
    let sec: any = Math.round(diffTime / 1000);

    if (days < 1) {
        if (hrs <= 25 && hrs !== 0) {
            time = `${hrs} hours ago`;
        } else {
            if (min <= 60 && min !== 0) {
                time = `${min} minutes ago`;
            } else {
                if (sec < 1000) {
                    time = `${sec} seconds ago`;
                }
            }
        }
        return time;
    } else {
        return `${
            date1.getMonth() + 1
        }/${date1.getDate()}/${date1.getFullYear()}`;
    }
};
