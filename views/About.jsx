const { useEffect, useRef } = React

import { utilService } from '../services/util.service.js'

export function About() {
  const personalContainerRef = useRef()

  useEffect(() => {
    utilService.animateCSS(personalContainerRef.current, 'backInUp')
  }, [])

  return (
    <section className="about grid">
      <h1 className="about-main-title">
        About Us - Meet the Dream Team Behind Mail&Keep
      </h1>

      <div className="content-container flex column">
        <p className="about-desc">Hey there!</p>
        <p className="about-desc">
          We are Ido and Ron, the dynamic duo behind{' '}
          <span className="app-name">Mail&Keep</span>.
        </p>
        <p className="about-desc">
          We love coffee, coding, and making life a little easier one app at a
          time.
        </p>
        <p className="about-desc">
          Join us on this wild ride as we revolutionize how you email and take
          notes.
        </p>
        <p className="about-desc">Cheers to productivity and good vibes!</p>
      </div>

      <img src="assets/img/coding.png" alt="Coding img" className="about-img" />

      <div className="personal-container flex" ref={personalContainerRef}>
        <div className="personal-details flex column align-center">
          <h3 className="name">Ron Felsenfeld</h3>

          <img
            src="assets/img/ron-profile.jpeg"
            alt="Profile img"
            className="personal-img"
          />

          <div className="links-container flex">
            <a
              href="https://il.linkedin.com/in/ron-felsenfeld-73553a261"
              className="linkedin blue"
            ></a>

            <a
              href="https://github.com/RonFelsenfeld"
              className="github blue"
            ></a>
          </div>
        </div>

        <div className="personal-details flex column align-center">
          <h3 className="name">Ido Yotvat</h3>

          <img
            src="assets/img/ido-profile.jpg"
            alt="Profile img"
            className="personal-img"
          />

          <div className="links-container flex">
            <a
              href="https://il.linkedin.com/in/ido-yotvat-52940020b"
              className="linkedin yellow"
            ></a>

            <a href="https://github.com/yotvat" className="github yellow"></a>
          </div>
        </div>
      </div>
    </section>
  )
}
