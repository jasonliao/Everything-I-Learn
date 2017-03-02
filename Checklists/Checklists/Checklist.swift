//
//  Checklist.swift
//  Checklists
//
//  Created by  jasonliao on 22/02/2017.
//  Copyright © 2017  jasonliao. All rights reserved.
//

import UIKit

class Checklist: NSObject, NSCoding {
    var name: String
    var iconName: String
    var items: [ChecklistItem]
    
    init(name: String, items: [ChecklistItem], iconName: String) {
        self.name = name
        self.items = items
        self.iconName = iconName
        super.init()
    }
    
    // MARK: NSCoding
    func encode(with aCoder: NSCoder) {
        aCoder.encode(name, forKey: "name")
        aCoder.encode(items, forKey: "items")
        aCoder.encode(iconName, forKey: "iconName")
    }
    
    required convenience init?(coder aDecoder: NSCoder) {
        let name = aDecoder.decodeObject(forKey: "name") as! String
        let items = aDecoder.decodeObject(forKey: "items") as! [ChecklistItem]
        let iconName = aDecoder.decodeObject(forKey: "iconName") as! String
        self.init(name: name, items: items, iconName: iconName)
    }
    
    func countUncheckedItem() -> Int {
//        var count = 0
//        for item in items where !item.checked {
//            count += 1
//        }
//        return count
        
        return items.reduce(0, { count, item in
            count + (item.checked ? 0 : 1)
        })
    }

}
