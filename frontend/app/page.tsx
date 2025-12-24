import { getAssetTypes } from '@/lib/api/asset-types'
import { getAssets } from '@/lib/api/assets'
import { getUsers } from '@/lib/api/users'
import { getTransactions } from '@/lib/api/transactions'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  // const assetTypes = await getAssetTypes()
  // console.log('assetTypes:', assetTypes)
  // const assets = await getAssets()
  // console.log('assets:', assets)
  // const users = await getUsers()
  // console.log('users:', users)
  // const transactions = await getTransactions()
  // console.log('transactions:', transactions)
  return <div>Home Page</div>
}
