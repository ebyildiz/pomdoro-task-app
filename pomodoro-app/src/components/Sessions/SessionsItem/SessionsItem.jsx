
export default function SessionsItem({ id, workTime, breakTime}) {
    return (
        <section className="session-item">
            <h1>Session {id}</h1>
            <h1>Work Time: {workTime}</h1>
            <h1>Break Time: {breakTime}</h1>
        </section>

    )
}