# Deploy to github packes
rm -r .deploy
mkdir .deploy
cd .deploy
git clone -b gh-pages https://github.com/btzr-io/Villain.git
cd ..
ls
rsync -arv ./packages/villain-web/dist/ .deploy/Villain
cd .deploy/Villain
git add .
git commit -a -m "update and deploy"
git push
