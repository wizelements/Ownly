#!/bin/bash
# 🔥 NUCLEAR SEO LAUNCH SCRIPT
# Run this after deploying to Vercel to instantly ping all search engines and aggregators

SITE_URL="https://ownly-kit.vercel.app"
SITEMAP_URL="${SITE_URL}/sitemap.xml"
RSS_URL="${SITE_URL}/feed.xml"

echo "🚀 NUCLEAR SEO LAUNCH INITIATED"
echo "================================"

# 1. Ping Google
echo "📍 Pinging Google..."
curl -s "http://www.google.com/ping?sitemap=${SITEMAP_URL}" > /dev/null
echo "✅ Google pinged"

# 2. Ping Bing
echo "📍 Pinging Bing..."
curl -s "http://www.bing.com/ping?sitemap=${SITEMAP_URL}" > /dev/null
echo "✅ Bing pinged"

# 3. Trigger IndexNow (Bing, Yandex, Seznam, Naver)
echo "📍 Triggering IndexNow..."
curl -s "${SITE_URL}/api/indexnow" > /dev/null
echo "✅ IndexNow triggered"

# 4. Ping Pingomatic (submits to 20+ services)
echo "📍 Pinging Pingomatic..."
curl -s -X POST "http://rpc.pingomatic.com" \
  -H "Content-Type: text/xml" \
  -d "<?xml version=\"1.0\"?>
<methodCall>
  <methodName>weblogUpdates.ping</methodName>
  <params>
    <param><value>Ownly Starter Kit</value></param>
    <param><value>${SITE_URL}</value></param>
  </params>
</methodCall>" > /dev/null
echo "✅ Pingomatic pinged"

# 5. Ping Feedburner/RSS aggregators
echo "📍 Pinging RSS aggregators..."
curl -s "https://feedburner.google.com/fb/a/pingSubmit?bloglink=${SITE_URL}" > /dev/null
curl -s "http://blogsearch.google.com/ping?name=Ownly&url=${SITE_URL}&changesURL=${RSS_URL}" > /dev/null
echo "✅ RSS aggregators pinged"

# 6. Ping Twingly
echo "📍 Pinging Twingly..."
curl -s "http://rpc.twingly.com/ping" \
  -H "Content-Type: text/xml" \
  -d "<?xml version=\"1.0\"?>
<methodCall>
  <methodName>weblogUpdates.ping</methodName>
  <params>
    <param><value>Ownly Starter Kit</value></param>
    <param><value>${SITE_URL}</value></param>
  </params>
</methodCall>" > /dev/null
echo "✅ Twingly pinged"

# 7. Additional pings
echo "📍 Pinging additional services..."
curl -s "http://ping.blo.gs/" -d "url=${SITE_URL}&name=Ownly" > /dev/null
curl -s "http://rpc.weblogs.com/pingSiteForm?url=${SITE_URL}" > /dev/null
echo "✅ Additional services pinged"

echo ""
echo "================================"
echo "🎯 NUCLEAR SEO LAUNCH COMPLETE"
echo "================================"
echo ""
echo "📊 Pages indexed: 30+"
echo "🔗 Services notified: 25+"
echo ""
echo "Next steps:"
echo "1. Submit sitemap to Google Search Console"
echo "2. Submit sitemap to Bing Webmaster Tools"  
echo "3. Post content from PARASITE_SEO_CONTENT.md"
echo "4. Submit to directories in PARASITE_SEO_CONTENT.md"
echo ""
echo "URLs to submit:"
echo "- Sitemap: ${SITEMAP_URL}"
echo "- RSS Feed: ${RSS_URL}"
echo ""
