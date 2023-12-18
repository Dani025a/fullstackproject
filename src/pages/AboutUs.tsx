import  "./aboutUs.css"

const AboutUs = () => {
    return (
        <div className="section">
          <h2 className="heading">Welcome to Danijel's Webshop</h2>
          <p className="text">
            From the heart of Denmark, Danijel's Webshop has emerged as a beacon of variety in online retail. With a vast array of products and a commitment to quality, we cater to all your needs under one digital roof. Our journey started with a passionate team of 120 employees, and together, we've cultivated a shopping experience that's as delightful as it is diverse.
          </p>
          <div className="imageContainer">
            <img src="https://img.freepik.com/free-vector/people-working-as-team-background-flat-style_23-2147767891.jpg" alt="Our Team" className="image" />
          </div>
          <h3 className="heading subHeading">Fostering Growth and Innovation</h3>
          <p className="text">
            Danijel's Webshop is more than just a marketplace; it's a community where innovation thrives and growth is nurtured. Based in the vibrant landscapes of Denmark, we are a fast-growing company dedicated to making a mark on the global e-commerce scene.
          </p>
          <div className="boxes-container">
            <div className="box">
              <h4 className="box-heading">Our Mission</h4>
              <p className="box-text">
                To provide a seamless shopping experience by offering a vast selection of products and unparalleled customer service, fostering a sense of community among our customers and employees.
              </p>
            </div>
            <div className="box">
              <h4 className="box-heading">Our Vision</h4>
              <p className="box-text">
                To be the leading online retailer in Europe, known for an extensive product range, innovative solutions, and a commitment to the satisfaction and well-being of our customers and team.
              </p>
            </div>
            <div className="box">
              <h4 className="box-heading">Our Goal</h4>
              <p className="box-text">
                To continuously grow and adapt in the dynamic world of e-commerce, while staying true to our Danish roots and values, ensuring that every customer finds exactly what they're looking for.
              </p>
            </div>
          </div>
        </div>
      );
    };

export default AboutUs