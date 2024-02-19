# git clone https://gitlab.com/ljf7/db
# wget -O ./db/audio/gone_rose.mp3 https://gr-sycdn.kuwo.cn/e89f2450e33e9339298ecf08f9826106/65bf3dd7/resource/n2/42/48/3059756298.mp3
# wget -O ./db/images/gone_rose.jpg https://picsum.photos/1000/1000
echo Process starts...
cd db
git add .
git config --global user.email "ljf@grr.la"
git config --global user.name "Andy"
git commit -m "Rename some mp3 and jpg"
git push https://gitlab.com/ljf7/db
cd ..
# git clone https://github.com/ljf74/music-player
cd music*
git add .
git commit -m "Rename some mp3 and jpg"
git push -u origin main
cd ..
echo Process exited