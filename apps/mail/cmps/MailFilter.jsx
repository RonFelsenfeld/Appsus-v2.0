export function MailFilter() {
  return (
    <section>
      {' '}
      <form>
        <input type="text" id="vendor" name="txt" />

        <label htmlFor="unread">Unread Only</label>
        <input type="checkbox" name="unread" id="unread" />
      </form>
    </section>
  )
}
