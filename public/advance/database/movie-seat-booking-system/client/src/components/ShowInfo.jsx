function ShowInfo({ show }) {
  const showTime = new Date(show.show_time).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <section className="showInfo">
      <h2>{show.title}</h2>
      <p>
        {show.screen_name} &middot; {showTime}
      </p>
    </section>
  );
}

export default ShowInfo;
