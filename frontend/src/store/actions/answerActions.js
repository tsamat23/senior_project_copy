import axios from "../../axios";
import { NotificationManager } from "react-notifications";

export const sendAnswer = data => async () => {
	try {
		return await axios.post("/answers/", data);
	} catch (e) {
		NotificationManager.error("Ошибка! Попробуйте позже");
	}
};

export const getAnswersFinishedSection = data => async () => {
	const answers = await axios.get(
		`/answers?sectionId=${data.sectionId}&userId=${data.userId}`
	);
};
