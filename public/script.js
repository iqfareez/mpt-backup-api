function ResourceItem({ name, length }) {
  return `
    <li>
      <a href="${name}">/${name}</a>
      <sup>${length ? `${length}x` : 'object'}</sup>
    </li>
  `
}

function ResourceList({ db }) {
  return `
    <ul>
      ${Object.keys(db)
      .map(name =>
        ResourceItem({
          name,
          length: Array.isArray(db[name]) && db[name].length
        })
      )
      .join('')}
    </ul>
  `
}

function NoResources() {
  return `<p>No resources found</p>`
}

function ResourcesBlock({ db }) {
  return `
    <div>
      ${Object.keys(db).length ? ResourceList({ db }) : NoResources()}
    </div>
  `
}

window
  .fetch('db')
  .then(response => response.json())
  .then(
    db =>
      (document.getElementById('resources').innerHTML = ResourcesBlock({ db }))
  )

window
  .fetch('log.json')
  .then(response => response.json())
  .then(
    function (log) {
      // get current month and year
      var d = new Date();
      var month = d.getMonth() + 1; // month in value 0 to 11
      var year = d.getFullYear();

      // get month from json
      var logMonth = log['valid_month']
      var logYear = log['valid_year']
      var statusBadge = `<span
      class="badge bg-warning text-dark">Unuseable</span>`

      // check if valid
      if (logMonth == month && logYear == year) {
        statusBadge = `<span
        class="badge bg-success">Healthy</span>`
      }
      return document.getElementById('last-run').innerHTML =
        `
        <b>Last updated:</b>&nbsp;<i>${log['fetcher_last_run']}</i>&nbsp;&nbsp;${statusBadge}
      `
    }
  )

function CustomRoutesBlock({ customRoutes }) {
  const rules = Object.keys(customRoutes)
  if (rules.length) {
    return `
      <div>
        <h1>Custom Routes</h1>
        <table>
          ${rules
        .map(
          rule =>
            `<tr>
              <td>${rule}</td>
              <td><code>⇢</code> ${customRoutes[rule]}</td>
            </tr>`
        )
        .join('')}
        </table>
      </div>
    `
  }
}

// window
//   .fetch('__rules')
//   .then(response => response.json())
//   .then(
//     customRoutes =>
//       (document.getElementById('custom-routes').innerHTML = CustomRoutesBlock({
//         customRoutes
//       }))
//   )
