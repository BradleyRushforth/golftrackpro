import React from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

const Navbar = () => (
  <Grid container alignItems="center" justifyContent="space-between">
    <Grid item xs={9}>
      <Button href="/">Golf Track Pro</Button>
    </Grid>
    <Grid item xs={1}>
      <Button href="/plans">Stock Yardages</Button>
    </Grid>
    <Grid item xs={1}>
      <Button href="/about">Handicap</Button>
    </Grid>
    <Grid item xs={1}>
      <Button href="/contact">Academy</Button>
    </Grid>
  </Grid>
)

export default Navbar
