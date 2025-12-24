import { getAssetTypes } from '@/lib/api/asset-types'
import { getAssets } from '@/lib/api/assets'
import { getUsers } from '@/lib/api/users'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  // const assetTypes = await getAssetTypes()
  // console.log('assetTypes:', assetTypes)
  // const assets = await getAssets()
  // console.log('assets:', assets)
  const users = await getUsers()
  console.log('users:', users)
  return <div>Home Page</div>
}
