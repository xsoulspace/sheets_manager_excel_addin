[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)
[![LICENSE](https://img.shields.io/github/license/xsoulspace/sheets_manager_excel_addin)](LICENSE)
[![Discord](https://img.shields.io/discord/696688204476055592)](https://discord.gg/y54DpJwmAn)

# Sheets Manager (Microsoft Excel Web Addin)

Welcome to the Sheets Manager repository! This repository contains the code for the custom pane for Microsoft Excel (web application called Web Addin).

The primary purpose of this addin is to manage Worksheets in Excel Workbook in the most efficient way.

## Features

- Search worksheets by name.
- Drag and drop worksheets to change their order.
- Switch to worksheet by click.
- Light and dark appearance.
- Rename worksheets.
- English, Russian, Italian translation.
- The whole app is in sync with the Excel Workbook - it means that you don't have to "sync" or "save" settings:)
- App uses Fluent UI style (close to Microsoft Design Guidelines) which adopts best practices of usability and just looks nice:).

[Learn more about Excel Addins on Microsoft](https://learn.microsoft.com/en-us/office/dev/add-ins/excel/excel-add-ins-overview)

Usage example:
![Preview](/assets/promo/usage.gif)

Sort functionality:
![Sort function](/assets/promo/sorting.gif)

## How to install

### macOS

Video instruction: https://www.youtube.com/watch?v=lvBIJXGeWu4

- Finder way

1. Open Finder and then enter Command+Shift+G to open the Go to folder dialog
2. Enter the following path:

`/Users/<username>/Library/Containers/com.microsoft.Excel/Data/Documents/wef`

Where <username> is the name of your system user.

If the `wef` folder doesn't exist on your computer, create it:

- Open Finder and then enter Command+Shift+G to open the Go to folder dialog
- Enter the following path:
  `/Users/<username>/Library/Containers/com.microsoft.Excel/Data/Documents/`

Create `wef` folder.

3. Copy the following add-in's manifest file to this `wef` folder.

https://raw.githubusercontent.com/xsoulspace/sheets_manager_excel_addin/develop/manifests/office_manifest.xml

4. Open Excel, and then open any document or restart Excel if it's already running.

5. In Excel, choose Insert > Add-ins > My Add-ins (drop-down menu), and then choose "Sheet Manager".

! Important
The addin will not show up in the My Add-ins dialog box. They are only visible within the drop-down menu (small down-arrow to the right of My Add-ins on the Insert tab).

### Additional information:

https://learn.microsoft.com/en-us/office/dev/add-ins/testing/sideload-an-office-add-in-on-mac

### Windows

_work in progress_

## Donations / Sponsor

Please sponsor or donate to the creator on [Boosty](https://boosty.to/arenukvern) or [CloudTips](https://pay.cloudtips.ru/p/1629cd27).

Thank you for your support and have a great day! 🌄

## Contributing

All [comments](https://github.com/xsoulspace/sheets_manager_excel_addin/issues) and [pull requests](https://github.com/xsoulspace/sheets_manager_excel_addin/pulls) are welcome.

## Getting Help

If you need help getting started with Sheet Manager or have any questions, check out our [Discord Community](https://discord.gg/y54DpJwmAn).

## Build

web:
flutter clean && flutter pub get && flutter build web --csp
