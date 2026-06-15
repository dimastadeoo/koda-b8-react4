import React from "react";
import filter from "./lib/filter"

/**
 * @typedef {Object} Geo
 * @property {string} lat - User Address Latitude.
 * @property {string} lng - User Address Longitude.
 */

/**
 * @typedef {Object} Address
 * @property {string} street - Street Name.
 * @property {string} suite - Number of Suite or Unit.
 * @property {string} city - User City.
 * @property {string} zipcode - User Zip Kode.
 * @property {Geo} geo - Location User Coordinates.
 */

/**
 * @typedef {Object} Company
 * @property {string} name - Company Name of User.
 * @property {string} catchPhrase - Company Slogan.
 * @property {string} bs - Business Field Company.
 */

/**
 * @typedef {Object} User
 * @property {number} id - ID User.
 * @property {string} name - Fullname User
 * @property {string} username - Username User.
 * @property {string} email - Email User.
 * @property {Address} address - User Address Data.
 * @property {string} phone - User Telephone number.
 * @property {string} website - Website User.
 * @property {Company} company - User Company Data.
 * 
 */

function App() {
  /**
   * State for save all data users from API.
   * @type {[User[], React.Dispatch<React.SetStateAction<User[]>>]}
   */
  const [users, setUsers] = React.useState([]);
  /**
   * State for saving keyword searching.
   * @type {[string, React.Dispatch<React.SetStateAction<string>>]}
   */
  const [searchName, setSearchName] = React.useState("");
  /**
   * State for saving loading status.
   * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
   */
  const [loading, setLoading] = React.useState(true);
  /**
   * State for saving Error Message.
   * @type {[string, React.Dispatch<React.SetStateAction<string>>]}
   */
  const [error, setError] = React.useState("");

  // Running code after rendering
  React.useEffect(() => {

    /**
     * Url API from get Data Users
     * @constant {string}
     */
    const url = 'https://jsonplaceholder.typicode.com/users'
    /**
     * Fetch data function
     * @returns {Promise<void>}
     */
    async function getUsers() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Gagal mengambil data users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getUsers();
  }, []);

   /**
   * Handle submit form search user.
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  function handleSearch(e) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const keyword = Object.fromEntries(formData.entries());
  setSearchName(keyword.searchName.toString());
}

  const filteredUsers = filter(users, searchName);
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <section className="mx-auto max-w-5xl">
        <div className="mb-8 rounded-2xl bg-white p-8 shadow-md">
          <h1 className="text-3xl font-bold text-slate-900">
            Pencarian User
          </h1>

          <p className="mt-2 text-slate-600">
            Data diambil dari JSONPlaceholder API, lalu difilter berdasarkan
            nama user.
          </p>

          <form onSubmit={handleSearch} className="mt-6">
            <label
              htmlFor="search"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Cari nama user
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="search"
                name="searchName"
                type="text"
                placeholder="Contoh: Leanne Graham"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

              <button
                type="submit"
                className="shrink-0 whitespace-nowrap rounded-xl bg-blue-600 px-3 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Cari Data
              </button>
            </div>
          </form>
        </div>

        {loading && (
          <div className="rounded-xl bg-white p-6 text-center shadow">
            <p className="font-medium text-slate-600">Loading data...</p>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
            <p className="font-semibold">Terjadi error</p>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-slate-700">
                Hasil pencarian:{" "}
                <span className="font-bold text-slate-900">
                  {filteredUsers.length}
                </span>{" "}
                user
              </p>
            </div>

            {filteredUsers.length === 0 ? (
              <div className="rounded-xl bg-white p-8 text-center shadow">
                <p className="text-slate-600">
                  User dengan nama tersebut tidak ditemukan.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {filteredUsers.map((user) => (
                  <article
                    key={user.id}
                    className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="mb-4 flex items-center gap-4">
                      <div>
                        <h2 className="text-lg font-bold text-slate-900">
                          {user.name}
                        </h2>
                        <p className="text-sm text-slate-500">
                          @{user.username}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-slate-700">
                      <p>
                        <span className="font-semibold">Email:</span>{" "}
                        {user.email}
                      </p>
                      <p>
                        <span className="font-semibold">Phone:</span>{" "}
                        {user.phone}
                      </p>
                      <p>
                        <span className="font-semibold">Website:</span>{" "}
                        {user.website}
                      </p>
                      <p>
                        <span className="font-semibold">Company:</span>{" "}
                        {user.company.name}
                      </p>
                      <p>
                        <span className="font-semibold">City:</span>{" "}
                        {user.address.city}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default App;