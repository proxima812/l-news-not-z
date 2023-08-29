const response = await fetch(import.meta.env.KEY + "/rest/v1/videos", {
 headers: {
  apikey: import.meta.env.KEY_ANON,
 },
});
const items = await response.json();

function List() {
 return (
  <>
   {items.map((post) => (
    <div className="flex flex-col gap-5 bg-white rounded-md p-5">
     <h3 className="text-lg flex items-start gap-2">
      <div>
       <svg
        xmlns="http://www.w3.org/2000/svg"
        height="36"
        width="36"
        viewBox="-35.20005 -41.33325 305.0671 247.9995"
       >
        <path
         d="M229.763 25.817c-2.699-10.162-10.65-18.165-20.748-20.881C190.716 0 117.333 0 117.333 0S43.951 0 25.651 4.936C15.553 7.652 7.6 15.655 4.903 25.817 0 44.236 0 82.667 0 82.667s0 38.429 4.903 56.85C7.6 149.68 15.553 157.681 25.65 160.4c18.3 4.934 91.682 4.934 91.682 4.934s73.383 0 91.682-4.934c10.098-2.718 18.049-10.72 20.748-20.882 4.904-18.421 4.904-56.85 4.904-56.85s0-38.431-4.904-56.85"
         fill="red"
        ></path>
        <path d="M93.333 117.559l61.333-34.89-61.333-34.894z" fill="#fff"></path>
       </svg>
      </div>{" "}
      <span>{post.title}</span>
     </h3>
     <a
      href={post.link}
      className="text-center bg-blue-500 text-white w-full py-2 rounded-md font-medium hover:bg-blue-600"
     >
      Смотреть
     </a>
    </div>
   ))}
  </>
 );
}
export default List;
