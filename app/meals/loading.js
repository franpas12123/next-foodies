import classes from './loading.module.css'
export default function MealsLoadingPage() {
  const { loading } = classes
  return <p className={loading}>Fetching meals...</p>
}
