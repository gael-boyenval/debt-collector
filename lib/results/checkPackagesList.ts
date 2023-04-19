const detectMinorVersion = (version, latest) => {
  const n = (str) => Number(str)
  // render Number(351) for a version like 3.5.1 and Number(292) for a version like 2.9.2
  // 3.5.1 is indeed greater than 2.9.2
  const format = (v) =>
    v
      .split('.')
      .map((str) => n(str))
      .join('')

  let specialVersion
  if (version.includes(' ')) {
    specialVersion = version.split(' ')[1].slice(-5)
  }
  return format(specialVersion ?? version) < format(latest)
}

export default async function checkPackagesList(packagesList, incrementFnc) {
  const npmRegistryUrl = 'https://replicate.npmjs.com/'

  const checks = await Promise.all(
    packagesList.map(([packageName, packageVersion]) => {
      const promise = new Promise((resolve, reject) => {
        if (!packageName.startsWith('@types')) {
          fetch(`${npmRegistryUrl}${packageName}`)
            .then((res) => res.json())
            .then((data) => {
              const { latest } = data['dist-tags']
              let version = packageVersion
              if (version.includes('^')) version = version.replace('^', '')

              const result = {
                package: packageName,
                latest,
                isMinor: detectMinorVersion(version, latest),
              }

              incrementFnc()
              resolve(result)
            })
        }
      })
      return promise
    })
  )
  return checks.filter((check) => check.isMinor)
}
