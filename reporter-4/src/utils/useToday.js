import React, { useReducer, useMemo, useEffect } from "react"
import { useContext } from "react"
import { useState } from "react"
import { FireContext } from "../FireContextProvider"

const TodayContext = React.createContext()

export const TodayContextProvider = ({ children }) => {
	const getTodayString = () => {
		return new Date().toDateString()
	}
	const [todayString, setTodayString] = useState(getTodayString)
	const [todayReady, setTodayReady] = useState(false)
	const { db } = useContext(FireContext)

	const todayDocs = useMemo(() => {
		const todayCollection = db.collection(
			`users/demo/${todayString.slice(-4)}/${todayString.slice(
				4,
				7
			)} ${todayString.slice(-4)}/${todayString}`
		)

		return {
			"😘": todayCollection.doc("😘"),
			"😊": todayCollection.doc("😊"),
			"😃": todayCollection.doc("😃"),
			"👎": todayCollection.doc("👎"),
			"❓": todayCollection.doc("❓")
		}
	}, [todayString])

	const [todayData, todayDispatch] = useReducer(
		(state, action) => {
			switch (action.type) {
				case "😘":
					return {
						...state,
						"😘": action.payload
					}
				case "😊":
					return {
						...state,
						"😊": action.payload
					}
				case "😃":
					return {
						...state,
						"😃": action.payload
					}
				case "👎":
					return {
						...state,
						"👎": action.payload
					}
				case "❓":
					return {
						...state,
						"❓": action.payload
					}
			}
		},
		{
			"😘": 0,
			"😊": 0,
			"😃": 0,
			"👎": 0,
			"❓": 0
		}
	)

	useEffect(() => {
		setTodayReady(false)
		Object.keys(todayDocs).forEach(emoji => {
			todayDocs[emoji].get().then(doc => {
				if (!doc.exists) {
					todayDocs[emoji].set(
						{
							timestamps: []
						},
						{ merge: true }
					)
				}
			})
		})
		const [kiss, warm, laugh, thumbsDown, question] = [
			"😘",
			"😊",
			"😃",
			"👎",
			"❓"
		].map(emoji => {
			return todayDocs[emoji].onSnapshot(doc => {
				todayDispatch({
					type: emoji,
					payload: doc.data()
				})
			})
		})
		setTodayReady(true)
		return () => {
			kiss()
			warm()
			laugh()
			thumbsDown()
			question()
		}
	}, [todayDocs])

	return (
		<TodayContext.Provider
			value={{
				todayString,
				setTodayString,
				getTodayString,
				todayData,
				todayDispatch,
				todayDocs,
				todayReady
			}}
		>
			{children}
		</TodayContext.Provider>
	)
}

export const useToday = () => {
	const today = useContext(TodayContext)
	return today
}
