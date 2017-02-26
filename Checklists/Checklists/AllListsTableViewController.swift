//
//  AllListsTableViewController.swift
//  Checklists
//
//  Created by  jasonliao on 21/02/2017.
//  Copyright © 2017  jasonliao. All rights reserved.
//

import UIKit

class AllListsTableViewController: UITableViewController, ListDetailTableViewControllerDelegate, UINavigationControllerDelegate {

    var dataModel: DataModel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        navigationController?.delegate = self
        let index = UserDefaults.standard.integer(forKey: "checklistIndex")
        if index != -1 {
            let checklist = dataModel.checklists[index]
            performSegue(withIdentifier: "ShowChecklist", sender: checklist)
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Table view data source

    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return dataModel.checklists.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = makeCell(for: tableView)
        cell.textLabel!.text = dataModel.checklists[indexPath.row].name
        cell.accessoryType = .detailDisclosureButton
        return cell
    }
    
    // Override to support conditional editing of the table view.
    override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        return true
    }
    

    // Override to support editing the table view.
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            dataModel.checklists.remove(at: indexPath.row)
            tableView.deleteRows(at: [indexPath], with: .fade)
        } else if editingStyle == .insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }
    
    override func tableView(_ tableView: UITableView, accessoryButtonTappedForRowWith indexPath: IndexPath) {
        let navigationController = storyboard!.instantiateViewController(withIdentifier: "ListDetailNavigationController") as! UINavigationController
        let tableViewController = navigationController.topViewController as! ListDetailTableViewController
        tableViewController.delegate = self

        let checklist = dataModel.checklists[indexPath.row]
        tableViewController.editChecklist = checklist

        present(navigationController, animated: true, completion: nil)
    }
    

    /*
    // Override to support rearranging the table view.
    override func tableView(_ tableView: UITableView, moveRowAt fromIndexPath: IndexPath, to: IndexPath) {

    }
    */

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the item to be re-orderable.
        return true
    }
    */
    
    // MARK: did select row
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        UserDefaults.standard.set(indexPath.row, forKey: "checklistIndex")
        performSegue(withIdentifier: "ShowChecklist", sender: dataModel.checklists[indexPath.row])
    }
    

    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "ShowChecklist" {
            let checklistTableViewController = segue.destination as! ChecklistTableViewController
            checklistTableViewController.checklist = sender as! Checklist
        } else if segue.identifier == "AddChecklist" {
            let listDetailNavigationController = segue.destination as! UINavigationController
            let liseDetailTabelViewController = listDetailNavigationController.topViewController as! ListDetailTableViewController
            
            liseDetailTabelViewController.delegate = self
            liseDetailTabelViewController.editChecklist = nil
        }
    }
    
    // MARK: UINavigationDelegate
    func navigationController(_ navigationController: UINavigationController, willShow viewController: UIViewController, animated: Bool) {
        if viewController == self {
            UserDefaults.standard.set(-1, forKey: "checklistIndex")
        }
    }
    
    
    // MARK: ListDetailTableViewControllerDelegate
    
    func listDetailTableViewControllerDidCancel(_ controller: UITableViewController) {
        dismiss(animated: true, completion: nil)
    }
    
    func listDetailTableViewControllerDidFinishAdding(_ controller: UITableViewController, checklist: Checklist) {
        let newRowIndex = dataModel.checklists.count
        let indexPath = IndexPath(row: newRowIndex, section: 0)
        
        dataModel.checklists.append(checklist)
        tableView.insertRows(at: [indexPath], with: .automatic)
        
        dismiss(animated: true, completion: nil)
        
    }
    
    func listDetailTableViewControllerDidFinishEditing(_ controller: UITableViewController, checklist: Checklist) {
        if let index = dataModel.checklists.index(of: checklist) {
            let indexPath = IndexPath(row: index, section: 0)
            if let cell = tableView.cellForRow(at: indexPath) {
                cell.textLabel!.text = checklist.name
            }
        }
        dismiss(animated: true, completion: nil)
    }
    
    // MARK: Private function
    private func makeCell(for tableView: UITableView) -> UITableViewCell {
        let cellIdentifier = "Cell"
        if let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier) {
            return cell
        } else {
            return UITableViewCell(style: .default, reuseIdentifier: cellIdentifier)
        }
    }
    
    
    

}
