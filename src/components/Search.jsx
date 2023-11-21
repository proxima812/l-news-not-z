import Fuse from 'fuse.js'
import { useState } from 'react'

// Configs fuse.js
// https://fusejs.io/api/options.html
const options = {
  keys: ['title', 'desc', 'price', 'link'],
  includeMatches: true,
  minMatchCharLength: 2,
  threshold: 0.5,
}

function Search({ postsList }) {
  // User's input
  const [query, setQuery] = useState('')

  const fuse = new Fuse(postsList, options)

  // Set a limit to the posts: 5
  const posts = fuse
    .search(query)
    .map((result) => result.item)
    .slice(0, 3)

  function handleOnSearch({ target = {} }) {
    const { value } = target
    setQuery(value)
  }

  return (
    <>
      <div className="relative w-full">
        <input
          className="ring-1 ring-gray-200 px-3 py-2 rounded-xl w-full"
          role="search"
          type="text"
          value={query}
          onChange={handleOnSearch}
          placeholder="Поиск..."
        />

        {posts && posts.length > 0 && (
          <ul className="z-10 ring-1 ring-gray-200 p-3 rounded-xl bg-white/80 backdrop-blur-md w-full absolute top-[50px]">
            {query.length > 1 && (
              <p className="text-gray-600">
                Найдено <b>{posts.length}</b>{' '}
                {posts.length === 1 ? 'результат' : 'результатов'}
                для
                <b> "{query}"</b>
              </p>
            )}

            <div className="mt-2 flex flex-col gap-3">
              {posts.map((post) => (
                <li className="p-2 rounded-lg bg-gray-50 ring-1 ring-gray-100 hover:bg-gray-100 transition-colors duration-75 ease-linear">
                  <>
                    <a href={post.link} target="_blank">
                      <h4 className="font-bold text-xl">&#10149; {post.title}</h4>
                      <p className="text-red-500 font-bold ">{post.price}</p>
                      <p className="text-gray-600 text-sm">{post.desc}</p>
                    </a>
                  </>
                </li>
              ))}
            </div>
          </ul>
        )}
      </div>
    </>
  )
}

export default Search
