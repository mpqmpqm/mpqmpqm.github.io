export function getDayDocs(str, db) {
	const dayCollection = db.collection(
		`users/test/${str.slice(-4)}/${str.slice(0, 3)} ${str.slice(
			-4
		)}/${str}`
	)
	return {
		"😘": dayCollection.doc("😘"),
		"😊": dayCollection.doc("😊"),
		"😃": dayCollection.doc("😃"),
		"👎": dayCollection.doc("👎"),
		"❓": dayCollection.doc("❓")
	}
}
