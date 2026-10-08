# CHANGELOG

## v7.2.1

[+] Minor config and visual changes.
[+] Added some dummy content.

## v7.1.1

[+] Bug fix: `Invalid hook call` warning from `Lightbox` is now fixed. It renders nothing until someone clicks, so I switched its mount to `client:only="react"`.
[+] Single point font size and scale changing capability.
[+] Per page custo font size and scaling support.
[+] Blogs pages can change font scale in the frontmatter.
[+] Works section's cards now have banner and thumbnail support.
[+] Featured works and "show all works" button.
[+] Custom card sizing. Instead of the previous default grid like view.
[+] Projects now have projectsUrl option to view the project's repo or whatever.
[+] No more .env for public infos (such as public keys), now use siteConfig.ts to put the public infos.

## v6.0.0

[+] Minor bug fixes.
[+] Made the contact form universal and modular. Use anywhere in the site with optional custom labels.
[+] E-book landing page added.
[+] New FAQ modular component added.

## v5.0.0

[-] Removed the pillar tag thingy.
[+] Blogs banner feature added.
[+] Blogs banner now show as thumbnail.
[+] Next-Previous blog buttons added.
[+] Code snippet copy button added.
[+] Blog search feature added.
[+] Filter by tags feature added.
[+] Certs card show banner as thumnail.
[+] Certs card have a button to view credential.
[+] Lightbox added to show pictures in the site in an enlarged blur blox.
[+] Featured certs feature with button to show all certs.
[+] Certs cards custom ordering feature added.

## v4.0.0

[+]Bug fixes.
    - Experience dates now shown properly with "show only year" support.
[+] Experience and Projects now show stuff below the frontmatter, the body.
[+] Markdown rendering according to brand.
[+] Added some real Experience and Projects.

## v3.0.0

[+] Added Dark/Light theming with button to change.
[+] Custom favicon support. With separate icons for Dark/Light themes.
[+] Separate profile pic support for Dark/Light themes.
[+] Fallback logic, for single img provided.

## v2.0.0

[+] Bug fixes.
    - Fixed: Page contents move with rotating hero roles.
    - Fixed: Adding profile photo not working.
    - Fixed: YouTube videos were not showing.
    - Fixed: Bg and cursor animation were not showing.
[+] Added Tag animation on hover.
[+] Tags now follow cards border and span properly.
[+] Testimonials rotation is now smooth with transition animation.

## v1.0.0

Initial commit. Developed the base stuff with demo content.
