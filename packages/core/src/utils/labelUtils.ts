export const getWeekDaysLabels = (
  format: "long" | "short" | "narrow" = "short",
): string [ ] => {
  const labels: string [ ] = [ ]
  // Use a known Monday to start (2024-01-01 was a Monday)
  const baseDate = new Date ( 2024, 0, 1 )
  for ( let i = 0; i < 7; i++ ) {
    const date = new Date ( baseDate )
    date.setDate ( baseDate.getDate () + i )
    labels.push ( date.toLocaleDateString ( "en-US", { weekday: format } ) )
  }
  return labels
}

export const getMonthLabels = (
  format: "long" | "short" | "narrow" | "numeric" | "2-digit" = "long",
): string [ ] => {
  const labels: string [ ] = [ ]
  for ( let i = 0; i < 12; i++ ) {
    const date = new Date ( 2024, i, 1 )
    labels.push ( date.toLocaleDateString ( "en-US", { month: format } ) )
  }
  return labels
}