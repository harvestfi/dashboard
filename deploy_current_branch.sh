#!/bin/sh -x

DEPLOY_CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
DEPLOY_CURRENT_COMMIT=$(git rev-parse HEAD)

git fetch origin && \
yarn build && \

git checkout -b tmp-gh-pages && \
git add -f ./build && \
git commit -m "$DEPLOY_CURRENT_BRANCH @ $DEPLOY_CURRENT_COMMIT" && \
git subtree split --prefix build -b gh-pages && \
git push -f origin gh-pages:gh-pages && \
git checkout $DEPLOY_CURRENT_BRANCH && \

# try this regardless
git branch -D tmp-gh-pages && \
git branch -D gh-pages
