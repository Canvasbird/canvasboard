import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterFolder',
})
export class FilterFolderPipe implements PipeTransform {
    transform(data: any, searchName: string) {
        if (searchName.toLowerCase() === '' || Object.keys(data).length === 0) {
            return data;
        }
        const folderNames: any[] = [];
        for (const item of data) {
            const folderName = item.folder_name;
            if (folderName.toLowerCase().startsWith(searchName.toLowerCase())) {
                folderNames.push(item);
            }
        }
        return folderNames;
    }
}
