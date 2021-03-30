import './Demo.scss';

const PICTURES = {
  DOGS: [
    '5PVXkqt2s9k',
    'NE0XGVKTmcA',
    '2pbnDRhXc6Q',
    'Qb7D1xw28Co',
    'N04FIfHhv_k',
    'Mv9hjnEUHR4',
    'tR6PdtuxF-M',
    'K4mSJ7kc0As',
    'F0if-2LD4cA',
    'wT3lf5qweEI'
  ],
  CATS: [
    'IuJc2qh2TcA',
    'OzAeZPNsLXk',
    'uhnbTZC7N9k',
    'BLW_KQ0Rkn0',
    'KGiQFgF7dkc',
    '75715CVEJhI',
    'VvTVkc_p-eg',
    'l5truYNKmm8',
    'fREiGY_l2Ok'
  ]
};

const Demo = () => (
  <>
    <main>
      <h1>Pet List</h1>
      <a href="#"></a>
    </main>
    <main className="pet">
      <h1>Single Pet</h1>
      <img
        src={`https://source.unsplash.com/${PICTURES.DOGS[1]}/600x800`}
        alt=""
      />
      <aside className="pet__information">
        <div>
          <h1>Jimmy</h1>
          <span>
            <span>Pug</span> | <span>3 Years Old</span> | <span>Male</span>
          </span>
        </div>
        <a href="" className="button">
          Apply for Adoption
        </a>
      </aside>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quisquam
        mollitia alias ducimus laboriosam soluta tempora vel ea, ut cupiditate.
      </p>
      <p>
        Ipsa unde quae delectus perspiciatis quod, soluta animi minus non illum.
        Molestiae dolore rem cupiditate in quibusdam eaque dolores quam.
      </p>
      <p>
        Nam, rem? Quis dignissimos nemo rerum amet quibusdam obcaecati
        repudiandae, accusamus velit voluptatibus harum minus? Eaque amet
        repellat dolor natus.
      </p>
    </main>
    <main>
      <h1>Random Pet</h1>
      <a href="#">
        <div className="pet-item">
          <img
            src={`https://source.unsplash.com/${PICTURES.DOGS[0]}/600x800`}
            alt=""
          />
          <div className="pet-item__details">
            <h5>Jimmy</h5>
            <small>
              <span>Pug</span> | <span>3 Years Old</span> | <span>Male</span>
            </small>
          </div>
        </div>
      </a>
      <button className="button">Choose other pet</button>
    </main>
  </>
);

export default Demo;
