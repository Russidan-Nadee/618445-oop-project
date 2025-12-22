import { getAssetTypes } from '@/lib/api/asset-types'

export default async function HomePage() {
  const assetTypes = await getAssetTypes()

  return (
    <div>
      <h1>Asset Types</h1>
      <ul>
        {assetTypes.map((t: any) => (
          <li key={t.id}>{t.name}</li>
        ))}
      </ul>
    </div>
  )
}
