# 14kB test

This tests downloading files of various sizes to test the affect of small file size changes on network performance. Speficically, it's to test the 14kB limit, where files of 14kB are likely to be sent in a single TCP round trip but a file of 15kB or more is likely to be sent in at least 2 round trips.
